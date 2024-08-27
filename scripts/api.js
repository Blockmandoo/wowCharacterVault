let clientId = getCookie("client-id", "");
let clientSecret = getCookie("client-secret", "");
let token = {};

async function getAccessToken(region = "us") {
  // if (token[region]) return token[region];
  let fetchURL = `https://${region}.battle.net/oauth/token`;
  response = await fetch(fetchURL, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  data = await response.json();
  if (data.error) throw "Invalid Client Credentials";
  token[region] = data.access_token;
  return token[region];
}

async function fetchCharacterWowApi(fetchURL, region, failString = "Failed to fetch data") {
  let accessToken = await getAccessToken(region);
  let timeKey = round(new Date().getTime() / updateTime);
  fetchURL = `${fetchURL.replace(/ACCESS_TOKEN/g, accessToken)}&t=${timeKey}`;
  if (reportFetches) console.log(`Fetching json from ${fetchURL}`);
  let response = await fetch(fetchURL);
  if (!response.ok) throw new Error(failString);
  let characterData = await response.json();
  return characterData;
}

async function getCharacterData(characterName, serverName, region = "us") {
  if (!characterName || !serverName) return;
  [characterName, serverName, region] = arrayToLowerCase([characterName, serverName, region]);
  serverName = serverName.replace(/[ ']/g, "-");
  let profile = await fetchCharacterWowApi(
    `https://${region}.api.blizzard.com/profile/wow/character/${serverName}/${characterName}?namespace=profile-${region}&locale=en_US&access_token=ACCESS_TOKEN`,
    region,
    `Failed to fetch ${characterName} character data`
  );

  let output = {
    name: profile.name,
    server: profile.realm?.name,
    gender: profile.gender?.name,
    faction: profile.faction?.name,
    race: profile.race?.name,
    class: profile.character_class?.name,
    spec: profile.active_spec?.name,
    realm: profile.realm?.name,
    guild: profile.guild?.name,
    level: profile.level,
    last_login: profile.last_login_timestamp,
    average_ilvl: profile.average_item_level,
    equipped_ilvl: profile.equipped_item_level,
  };

  return output;
}

async function getCharacterProfessions(characterName, serverName, region = "us") {
  if (!characterName || !serverName) return;
  [characterName, serverName, region] = arrayToLowerCase([characterName, serverName, region]);
  serverName = serverName.replace(/[ ']/g, "-");
  let profile = await fetchCharacterWowApi(
    `https://${region}.api.blizzard.com/profile/wow/character/${serverName}/${characterName}/professions?namespace=profile-${region}&locale=en_US&access_token=ACCESS_TOKEN`,
    region,
    `Failed to fetch ${characterName} character professions`
  );

  let regex = new RegExp(professionName);
  let secondaries = profile.secondaries?.filter((a) => a.profession.name != "Archaeology");
  let profession1CurrentTier = profile.primaries?.[0]?.tiers?.filter((a) => regex.test(a.tier.name))[0];
  let profession2CurrentTier = profile.primaries?.[1]?.tiers?.filter((a) => regex.test(a.tier.name))[0];
  let profession3CurrentTier = secondaries?.[0]?.tiers?.filter((a) => regex.test(a.tier.name))[0];
  let profession4CurrentTier = secondaries?.[1]?.tiers?.filter((a) => regex.test(a.tier.name))[0];
  let profession5CurrentTier = profile.secondaries?.filter((a) => a.profession.name == "Archaeology")[0];

  let output = {};
  if (profile.primaries?.length > 0) {
    output.profession1 = {
      name: profile.primaries?.[0]?.profession?.name,
      level: profession1CurrentTier?.skill_points || 0,
      cap: profession1CurrentTier?.max_skill_points || 0,
    };
  }
  if (profile.primaries?.length > 1) {
    output.profession2 = {
      name: profile.primaries?.[1]?.profession?.name,
      level: profession2CurrentTier?.skill_points || 0,
      cap: profession2CurrentTier?.max_skill_points || 0,
    };
  }
  if (secondaries?.length > 0) {
    output.profession3 = {
      name: secondaries?.[0]?.profession?.name,
      level: profession3CurrentTier?.skill_points || 0,
      cap: profession3CurrentTier?.max_skill_points || 0,
    };
  }
  if (secondaries?.length > 1) {
    output.profession4 = {
      name: secondaries?.[1]?.profession?.name,
      level: profession4CurrentTier?.skill_points || 0,
      cap: profession4CurrentTier?.max_skill_points || 0,
    };
  }
  if (profile.secondaries?.length > 2) {
    output.profession5 = {
      name: "Archaeology",
      level: profession5CurrentTier?.skill_points || 0,
      cap: profession5CurrentTier?.max_skill_points || 0,
    };
  }

  regex = /Herbalism|Mining|Skinning/;
  if (output.profession1) output.profession1.score = regex.test(output.profession1.name) ? output.profession1.level * professionScore.gathering.multiplier : output.profession1.level * professionScore.main.multiplier;
  if (output.profession2) output.profession2.score = regex.test(output.profession2.name) ? output.profession2.level * professionScore.gathering.multiplier : output.profession2.level * professionScore.main.multiplier;
  if (output.profession3) output.profession3.score = output.profession3.level * professionScore.cooking.multiplier;
  if (output.profession4) output.profession4.score = output.profession4.level * professionScore.fishing.multiplier;
  if (output.profession5) output.profession5.score = output.profession5.level * professionScore.archaeology.multiplier;
  output.score = Math.floor((output.profession1?.score || 0) + (output.profession2?.score || 0) + (output.profession3?.score || 0) + (output.profession4?.score || 0) + (output.profession5?.score || 0));

  return output || {};
}

async function getCharacterGear(characterName, serverName, region = "us") {
  if (!characterName || !serverName) return;
  [characterName, serverName, region] = arrayToLowerCase([characterName, serverName, region]);
  serverName = serverName.replace(/[ ']/g, "-");
  let profile = await fetchCharacterWowApi(
    `https://${region}.api.blizzard.com/profile/wow/character/${serverName}/${characterName}/equipment?namespace=profile-${region}&locale=en_US&access_token=ACCESS_TOKEN`,
    region,
    `Failed to fetch ${characterName} character gear`
  );

  let output = {};
  for (let piece of profile.equipped_items) {
    let slot = piece.slot.name.toLowerCase().replace(/ /g, "_");
    if (!/tabard|shirt/.test(slot)) {
      output[slot] = {};
      output[slot].name = piece.name;
      output[slot].ilvl = piece.level?.value || 0;
      output[slot].rarity = piece.quality?.name;
      if (piece.enchantments) output[slot].enchant = fixWowString(piece.enchantments[0].display_string);
      if (piece.sockets) output[slot].sockets = piece.sockets.map((a) => a.display_string);
      if (tierSets.test(piece.set?.display_string)) output[slot].tier = true;
      if (craftedUnique.test(piece.limit_category)) output[slot].craftedUnique = true;
      if (piece.sockets?.some((a) => uniqueGem.test(a.item?.name))) output.uniqueGem = true;
    }
  }

  output.equipedIlvl = 0;
  output.tier = 0;
  output.craftedUnique = 0;
  if (!output.uniqueGem) output.uniqueGem = false;
  for (let slot in output) {
    if (output[slot].ilvl) output.equipedIlvl += output[slot].ilvl;
    if (output[slot].tier) output.tier++;
    if (output[slot].craftedUnique) output.craftedUnique++;
  }
  if (!output.off_hand?.ilvl) output.equipedIlvl += output.main_hand.ilvl;
  output.equipedIlvl /= 16;

  return output;
}

async function getCharacterStats(characterName, serverName, region = "us") {
  if (!characterName || !serverName) return;
  [characterName, serverName, region] = arrayToLowerCase([characterName, serverName, region]);
  serverName = serverName.replace(/[ ']/g, "-");
  let profile = await fetchCharacterWowApi(
    `https://${region}.api.blizzard.com/profile/wow/character/${serverName}/${characterName}/statistics?namespace=profile-${region}&locale=en_US&access_token=ACCESS_TOKEN`,
    region,
    `Failed to fetch ${characterName} character gear`
  );

  let output = {
    health: profile.health || 0,
    agility: profile.agility?.effective || 0,
    intellect: profile.intellect?.effective || 0,
    strength: profile.strength?.effective || 0,
    crit: profile.melee_crit?.rating || 0,
    haste: profile.melee_haste?.rating || 0,
    mastery: profile.mastery?.rating || 0,
    versatility: profile.versatility || 0,
    avoidance: profile.avoidance?.rating || 0,
    lifesteal: profile.lifesteal?.rating || 0,
    speed: profile.speed?.rating || 0,
  };

  return output;
}

async function getCharacterMedia(characterName, serverName, region = "us") {
  if (!characterName || !serverName) return;
  [characterName, serverName, region] = arrayToLowerCase([characterName, serverName, region]);
  serverName = serverName.replace(/[ ']/g, "-");
  let profile = await fetchCharacterWowApi(
    `https://${region}.api.blizzard.com/profile/wow/character/${serverName}/${characterName}/character-media?namespace=profile-${region}&locale=en_US&access_token=ACCESS_TOKEN`,
    region,
    `Failed to fetch ${characterName} character media`
  );

  let output = {};
  for (let asset of profile.assets) output[asset.key] = asset.value;

  return output;
}

async function getCharacterRaids(characterName, serverName, region = "us") {
  if (!characterName || !serverName) return;
  [characterName, serverName, region] = arrayToLowerCase([characterName, serverName, region]);
  serverName = serverName.replace(/[ ']/g, "-");
  let profile = await fetchCharacterWowApi(
    `https://${region}.api.blizzard.com/profile/wow/character/${serverName}/${characterName}/encounters/raids?namespace=profile-${region}&locale=en_US&access_token=ACCESS_TOKEN`,
    region,
    `Failed to fetch ${characterName} character raids`
  );

  // !! THIS NEEDS TO BE LOOKED AT WHEN THERES ONE RAID OUT !!
  let output;
  let currentSeason = profile?.expansions?.filter((a) => a.expansion.name == "Current Season");
  if (currentSeason?.length > 0) {
    output = currentSeason[0].instances.map((instance) => {
      let mapOutput = {name: instance.instance.name};
      let lockout = instance.modes.filter((save) => save.difficulty.type == "LFR");
      if (lockout.length > 0) mapOutput.lfr = `${lockout[0].progress.completed_count}/${lockout[0].progress.total_count}`;
      lockout = instance.modes.filter((save) => save.difficulty.type == "NORMAL");
      if (lockout.length > 0) mapOutput.normal = `${lockout[0].progress.completed_count}/${lockout[0].progress.total_count}`;
      lockout = instance.modes.filter((save) => save.difficulty.type == "HEROIC");
      if (lockout.length > 0) mapOutput.heroic = `${lockout[0].progress.completed_count}/${lockout[0].progress.total_count}`;
      lockout = instance.modes.filter((save) => save.difficulty.type == "MYTHIC");
      if (lockout.length > 0) mapOutput.mythic = `${lockout[0].progress.completed_count}/${lockout[0].progress.total_count}`;
      return mapOutput;
    });
  }

  return output;
}

async function getCharacterMythics(characterName, serverName, region = "us") {
  if (!characterName || !serverName) return;
  [characterName, serverName, region] = arrayToLowerCase([characterName, serverName, region]);
  serverName = serverName.replace(/[ ']/g, "-");
  let profile = await fetchCharacterWowApi(
    `https://${region}.api.blizzard.com/profile/wow/character/${serverName}/${characterName}/mythic-keystone-profile?namespace=profile-${region}&locale=en_US&access_token=ACCESS_TOKEN`,
    region,
    `Failed to fetch ${characterName} character mythic dungeons`
  );

  let output = {
    rating: profile.current_mythic_rating?.rating,
    color: rgbToHex(profile.current_mythic_rating?.color?.r, profile.current_mythic_rating?.color?.g, profile.current_mythic_rating?.color?.b),
  };

  if (output.rating > 0) {
    profile = await getCharacterRaiderIO(characterName, serverName, region, true);
    output.weekly_best = profile?.mythic_plus_weekly_highestLevel_runs?.map((a) => a.mythic_level);
    output.last_weekly_best = profile?.mythic_plus_previous_weekly_highestLevel_runs?.map((a) => a.mythic_level);
    output.season_best = profile?.mythic_plus_best_runs?.map((a) => {
      return {full_name: a.dungeon, short_name: a.short_name, level: a.mythic_level};
    });
  }

  return output;
}

async function getCharacterRaiderIO(characterName, serverName, region = "us", bypass) {
  if (!bypass) {
    if (!characterName || !serverName) return;
    [characterName, serverName, region] = arrayToLowerCase([characterName, serverName, region]);
    serverName = serverName.replace(/[ ']/g, "-");
  }
  let timeKey = round(new Date().getTime() / updateTime);

  let fetchURL = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${serverName}&name=${characterName}&fields=mythic_plus_weekly_highestLevel_runs&t=${timeKey}`;
  if (reportFetches) console.log(`Fetching json from ${fetchURL}`);
  let response = await fetch(fetchURL);
  let output1 = await response.json();

  fetchURL = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${serverName}&name=${characterName}&fields=mythic_plus_previous_weekly_highestLevel_runs&t=${timeKey}`;
  if (reportFetches) console.log(`Fetching json from ${fetchURL}`);
  response = await fetch(fetchURL);
  let output2 = await response.json();

  fetchURL = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${serverName}&name=${characterName}&fields=mythic_plus_best_runs&t=${timeKey}`;
  if (reportFetches) console.log(`Fetching json from ${fetchURL}`);
  response = await fetch(fetchURL);
  let output3 = await response.json();

  return {...output1, ...output2, ...output3};
}
