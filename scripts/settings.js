// let professionName = "Dragon Isles"; // What prefix or sufix is used to denote the expansion variant of profession
let professionName = "Khaz Algar"; // What prefix or sufix is used to denote the expansion variant of profession
// let tierSets = /Heartfire Sentinel's Authority|Irons of the Onyx Crucible|Lurking Specter's Shadeweave|Risen Nightmare's Gravemantle|Scales of the Awakened|Screaming Torchfiend's Brutality|Sinister Savant's Cursethreads|Stormwing Harrier's Camouflage|Strands of the Autumn Blaze|The Furnace Seraph's Verdict|Vision of the Greatwolf Outcast|Wayward Chronomancer's Clockwork|Wrappings of the Waking Fist/;
let tierSets = /Destroyer's Scarred Wards|Entombed Seraph's Radiance|Exhumed Centurion's Relics|Gatecrasher's Fortitude|Husk of the Hypogeal Nemesis|K'areshi Phantom's Bindings|Lightless Scavenger's Necessities|Mane of the Greatlynx|Rites of the Hexflame Coven|Shards of Living Luster|Sparks of Violet Rebirth|Warsculptor's Masterwork|Waves of the Forgotten Reservoir/;
let craftedUnique = /Embellished/;
// let uniqueGem = /Illimited/;
let uniqueGem = /Blasphemite/;
// let maxLevel = 70;
let maxLevel = 80;
// let gearBreakpoints = [425, 475, 495, 510, 525];
let gearBreakpoints = [535, 585, 605, 620, 635];
let maxTabs = 5;
let reportFetches = true;
let updateTime = time.minute(15);

let defaultTab = {
  name: "Page 1",
  filter: {
    // Home Options:
    // index icon name server region class spec role lvl ilvl gender race faction guild mythicScore
    // raidLFR raidNormal raidHeroic raidMythic profession1 profession2 professionScore lastOnline playtime links notes
    home: ["icon", "name", "lvl", "ilvl", "race", "guild", "mythicScore", "raidNormal", "raidHeroic"],

    // Profession Options:
    // index icon name server region lvl ilvl race faction professionScore profession1 profession2 cooking fishing archaeology playtime notes
    professions: ["icon", "name", "lvl", "professionScore", "profession1", "profession2", "cooking", "fishing"],

    // Class Stat Options:
    // className count allianceCount hordeCount highestLevel highestAllianceLevel highestHordeLevel maxCount maxAllianceCount maxHordeCount showUnused
    class_stats: ["className", "count", "highestLevel", "maxCount"],

    // Race Stat Options:
    // raceName count highestLevel maxCount showUnused
    race_stats: ["raceName", "count", "highestLevel", "maxCount"],

    // Gear Options:
    // index icon name server region lvl ilvl tierCount craftedUnique uniqueGem
    // pieceIlvl sockets enchants health mainStats secondaryStats tertiaryStats notes
    gear: ["icon", "name", "lvl", "ilvl", "tierCount", "secondaryStats"],

    // Raid Options:
    // index icon name server region lvl ilvl raidLFR raidNormal raidHeroic raidMythic notes
    raid: ["icon", "name", "lvl", "ilvl", "raidLFR", "raidNormal", "raidHeroic"],

    // Mythic Options:
    // index icon name server region lvl ilvl mythicScore thisWeekRunCount thisWeekRuns lastWeekRunCount lastWeekRuns season_runs
    mythic: ["icon", "name", "lvl", "ilvl", "mythicScore", "season_runs"],
  },
  sort: {
    home: ["lvl", "ilvl", "name"],
    professions: ["professionScore", "lvl", "ilvl"],
    class_stats: ["maxCount", "count", "highestLevel"],
    race_stats: ["maxCount", "count", "highestLevel"],
    gear: ["ilvl", "lvl", "name"],
    raid: ["lvl", "ilvl", "name"],
    mythic: ["lvl", "ilvl", "name"],
  },
  characters: [],
};

/* Score breakdown:
Main 2: 300 + 300 = 600
Gathering Professions: 200
Cooking: 200
Fishing: 150
Archaeology: 50
Total: 1000 */
let professionScores = {
  main: {
    skill: 100,
    value: 300,
  },
  gathering: {
    skill: 100,
    value: 200,
  },
  cooking: {
    skill: 100,
    value: 200,
  },
  fishing: {
    skill: 300,
    value: 150,
  },
  archaeology: {
    skill: 950,
    value: 50,
  },
};

// This will fill in more information that can be inferred from the data above
professionScores.max = 0;
for (let category in professionScores) {
  let {skill, value} = professionScores[category];
  professionScores[category].multiplier = value / skill;
  if (category != "gathering" && value) professionScores.max += value;
  if (category == "main" && value) professionScores.max += value;
}
