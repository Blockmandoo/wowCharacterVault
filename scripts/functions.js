let arrayToLowerCase = (array) => array.map((entry) => entry.toLowerCase());

let time = {
  second: (count = 1) => count * 1000, // 1000
  minute: (count = 1) => count * 60000, // 1000 * 60
  hour: (count = 1) => count * 3600000, // 1000 * 60 * 60
  day: (count = 1) => count * 86400000, // 1000 * 60 * 60 * 24
  week: (count = 1) => count * 604800000, // 1000 * 60 * 60 * 24 * 7
  month: (count = 1) => count * 2592000000, // 1000 * 60 * 60 * 24 * 30
  year: (count = 1) => count * 31536000000, // 1000 * 60 * 60 * 24 * 365
};

let round = (val, places = 0) => Math.round(val * 10 ** places) / 10 ** places;
let floor = (val, places = 0) => Math.floor(val * 10 ** places) / 10 ** places;
let ceil = (val, places = 0) => Math.ceil(val * 10 ** places) / 10 ** places;
let displayBoolean = (val) => (val ? "✓" : "X");

function setCookie(name, val) {
  localStorage.setItem(`myn-${name}`, JSON.stringify(val));
  return val;
}

function getCookie(name, defaultVal = null) {
  let output = localStorage.getItem(`myn-${name}`);
  if (!output && defaultVal) setCookie(name, defaultVal);
  return output ? JSON.parse(output) : defaultVal;
}

function delCookie(name) {
  let output = getCookie(name);
  localStorage.removeItem(`myn-${name}`);
  return output;
}

function setSessionCookie(name, val) {
  sessionStorage.setItem(`myn-${name}`, JSON.stringify(val));
  return val;
}

function getSessionCookie(name, defaultVal = null) {
  let output = sessionStorage.getItem(`myn-${name}`);
  if (!output && defaultVal) setSessionCookie(name, defaultVal);
  return output ? JSON.parse(output) : defaultVal;
}

function parseIf(val) {
  if (!/\d+(\.\d+)?/.test(val)) return val;
  return parseFloat(val);
}

function getCharId(characterName, serverName, region = "us") {
  [characterName, serverName, region] = [characterName, serverName, region].map((a) => a.toLowerCase());
  serverName = serverName.replace(/[ ']/g, "-");
  return `${characterName}_${serverName}_${region}`;
}

function toCamelCase(str) {
  return str
    .toLowerCase()
    .split(/[\s']+/)
    .map((word, index) => (index == 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join("");
}

function getTableWidth() {
  let cells = document.querySelectorAll("tr > *");
  let columnCount = 0;
  cells.forEach((cell) => {
    let colspan = cell.getAttribute("colspan");
    columnCount += parseInt(colspan || 1);
  });
  return columnCount - 1;
}

function convertTime(val, measure) {
  if (measure == "days" || measure == "day") val = time.day(val);
  else if (measure == "hours" || measure == "hour") val = time.hour(val);
  else if (measure == "minutes" || measure == "minute") val = time.minute(val);
  else if (measure == "seconds" || measure == "second") val = time.second(val);

  if (val < time.second(60)) return round(val / time.second(), 2) + " Seconds";
  if (val < time.minute(60)) return round(val / time.minute(), 2) + " Minutes";
  if (val < time.hour(24)) return round(val / time.hour(), 2) + " Hours";
  if (val < time.day(30)) return round(val / time.day(), 2) + " Days";
  if (val < time.day(365)) return round(val / time.month(), 2) + " Months";
  return round(val / time.year(), 2) + " Years";
}

function getGearRarity(item_level) {
  if (typeof item_level != "number") return;
  if (item_level < gearBreakpoints[0]) return "poor";
  if (item_level < gearBreakpoints[1]) return "common";
  if (item_level < gearBreakpoints[2]) return "uncommon";
  if (item_level < gearBreakpoints[3]) return "rare";
  if (item_level < gearBreakpoints[4]) return "epic";
  return "legendary";
}

function getRole(classs, spec) {
  let id = `${classs}-${spec}`;
  let translate = {
    "Death Knight-Blood": "Tank",
    "Death Knight-Frost": "Melee DPS",
    "Death Knight-Unholy": "Melee DPS",
    "Demon Hunter-Havoc": "Melee DPS",
    "Demon Hunter-Vengeance": "Tank",
    "Druid-Balance": "Ranged DPS",
    "Druid-Feral": "Melee DPS",
    "Druid-Guardian": "Tank",
    "Druid-Restoration": "Ranged Healer",
    "Evoker-Augmentation": "Ranged DPS",
    "Evoker-Devastation": "Ranged DPS",
    "Evoker-Preservation": "Ranged Healer",
    "Hunter-Beast Mastery": "Ranged DPS",
    "Hunter-Marksmanship": "Ranged DPS",
    "Hunter-Survival": "Melee DPS",
    "Mage-Arcane": "Ranged DPS",
    "Mage-Fire": "Ranged DPS",
    "Mage-Frost": "Ranged DPS",
    "Monk-Brewmaster": "Tank",
    "Monk-Mistweaver": "Melee Healer",
    "Monk-Windwalker": "Melee DPS",
    "Paladin-Holy": "Melee Healer",
    "Paladin-Protection": "Tank",
    "Paladin-Retribution": "Melee DPS",
    "Priest-Discipline": "Ranged Healer",
    "Priest-Holy": "Ranged Healer",
    "Priest-Shadow": "Ranged DPS",
    "Rogue-Assassination": "Melee DPS",
    "Rogue-Outlaw": "Melee DPS",
    "Rogue-Subtlety": "Melee DPS",
    "Shaman-Elemental": "Ranged DPS",
    "Shaman-Enhancement": "Melee DPS",
    "Shaman-Restoration": "Ranged Healer",
    "Warlock-Affliction": "Ranged DPS",
    "Warlock-Demonology": "Ranged DPS",
    "Warlock-Destruction": "Ranged DPS",
    "Warrior-Arms": "Melee DPS",
    "Warrior-Fury": "Melee DPS",
    "Warrior-Protection": "Tank",
  };
  return translate[id];
}

function colorScale(percent, isQuality) {
  percent = percent <= 1 ? percent * 100 : percent > 100 ? 100 : percent;
  // Define the three colors
  let top = "#74e752"; // Green
  let mid = "#e7e552"; // Yellow
  let bot = "#e75252"; // Red

  // Use different colors if it is an item quality
  if (isQuality) {
    top = "#a335ee"; // Epic
    mid = "#0070dd"; // Rare
    bot = "#1eff00"; // Uncommon
  }

  // Convert hex colors to RGB
  let topRgb = hexToRgb(top);
  let midRgb = hexToRgb(mid);
  let botRgb = hexToRgb(bot);

  // Interpolation logic
  let color;
  // Interpolate between bot and mid
  if (percent <= 50) color = interpolateColor(botRgb, midRgb, percent / 50);
  // Interpolate between mid and top
  else color = interpolateColor(midRgb, topRgb, (percent - 50) / 50);
  // Convert the interpolated color back to hex
  return rgbToHex(color.r, color.g, color.b);
}

function gearColorScale(percent) {
  percent = percent <= 1 ? percent * 100 : percent > 100 ? 100 : percent;

  // Define the five colors
  let top = "#ff8000"; // Legendary
  let highMid = "#a335ee"; // Epic
  let mid = "#0070dd"; // Rare
  let lowMid = "#1eff00"; // Uncommon
  let bot = "#ffffff"; // Common

  // Convert hex colors to RGB
  let topRgb = hexToRgb(top);
  let highMidRgb = hexToRgb(highMid);
  let midRgb = hexToRgb(mid);
  let lowMidRgb = hexToRgb(lowMid);
  let botRgb = hexToRgb(bot);

  // Interpolation logic
  let color;
  if (percent <= 25) {
    // Interpolate between bot and lowMid
    color = interpolateColor(botRgb, lowMidRgb, percent / 25);
  } else if (percent <= 50) {
    // Interpolate between lowMid and mid
    color = interpolateColor(lowMidRgb, midRgb, (percent - 25) / 25);
  } else if (percent <= 75) {
    // Interpolate between mid and highMid
    color = interpolateColor(midRgb, highMidRgb, (percent - 50) / 25);
  } else {
    // Interpolate between highMid and top
    color = interpolateColor(highMidRgb, topRgb, (percent - 75) / 25);
  }

  // Convert the interpolated color back to hex
  return rgbToHex(color.r, color.g, color.b);
}

function hexToRgb(hex) {
  // Remove the hash symbol if present
  hex = hex.replace(/^#/, "");

  // Parse the hex values to RGB
  let bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function interpolateColor(color1, color2, factor) {
  // Interpolate between two colors by a factor
  let result = {
    r: Math.round(color1.r + factor * (color2.r - color1.r)),
    g: Math.round(color1.g + factor * (color2.g - color1.g)),
    b: Math.round(color1.b + factor * (color2.b - color1.b)),
  };
  return result;
}

function rgbToHex(r, g, b) {
  // Convert RGB values to a hex string
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function cratingQualityColor(stringVal) {
  if (!stringVal) return colorScale(0);
  if (/[☆⭐]{3}/.test(stringVal)) return colorScale(100);
  if (/[☆⭐]{2}/.test(stringVal)) return colorScale(50);
  if (/[☆⭐]/.test(stringVal)) return colorScale(15);
  return "inherit";
}

function fixWowString(stringVal) {
  stringVal = stringVal
    // Uneeded froo froo
    .replace(/Enchanted: /g, "")

    // Tier
    .replace(/\|.*-Tier1-?.*\|a/g, "☆")
    .replace(/\|.*-Tier2-?.*\|a/g, "☆☆")
    .replace(/\|.*-Tier3-?.*\|a/g, "☆☆☆")

    // Name -> Stats
    .replace(/Fierce Armor Kit ☆$/g, "+74 Stamina & +124 Agility/Strength ☆")
    .replace(/Fierce Armor Kit ☆☆$/g, "+89 Stamina & +151 Agility/Strength ☆☆")
    .replace(/Fierce Armor Kit ☆☆☆$/g, "+105 Stamina & +177 Agility/Strength ☆☆☆")
    .replace(/Frosted Armor Kit ☆$/g, "+99 Armor & +124 Agility/Strength ☆")
    .replace(/Frosted Armor Kit ☆☆$/g, "+120 Armor & +151 Agility/Strength ☆☆")
    .replace(/Frosted Armor Kit ☆☆☆$/g, "+141 Armor & +177 Agility/Strength ☆☆☆")
    .replace(/Graceful Avoidance ☆$/g, "+75 Avoidance ☆")
    .replace(/Graceful Avoidance ☆☆$/g, "+100 Avoidance ☆☆")
    .replace(/Graceful Avoidance ☆☆☆$/g, "+125 Avoidance ☆☆☆")
    .replace(/Homebound Speed ☆$/g, "+75 Speed ☆")
    .replace(/Homebound Speed ☆☆$/g, "+100 Speed ☆☆")
    .replace(/Homebound Speed ☆☆☆$/g, "+125 Speed ☆☆☆")
    .replace(/Plainsrunner's Breeze ☆$/g, "+200 Speed ☆")
    .replace(/Plainsrunner's Breeze ☆☆$/g, "+225 Speed ☆☆")
    .replace(/Plainsrunner's Breeze ☆☆☆$/g, "+250 Speed ☆☆☆")
    .replace(/Regenerative Leech ☆$/g, "+75 Leech ☆")
    .replace(/Regenerative Leech ☆☆$/g, "+100 Leech ☆☆")
    .replace(/Regenerative Leech ☆☆☆$/g, "+125 Leech ☆☆☆")
    .replace(/Reinforced Armor Kit ☆$/g, "+74 Agility/Strength ☆")
    .replace(/Reinforced Armor Kit ☆☆$/g, "+90 Agility/Strength ☆☆")
    .replace(/Reinforced Armor Kit ☆☆☆$/g, "+106 Agility/Strength ☆☆☆")
    .replace(/Waking Stats ☆$/g, "+105 Primary Stats ☆")
    .replace(/Waking Stats ☆☆$/g, "+127 Primary Stats ☆☆")
    .replace(/Waking Stats ☆☆☆$/g, "+150 Primary Stats ☆☆☆")
    .replace(/Watcher's Loam ☆$/g, "+74 Stamina ☆")
    .replace(/Watcher's Loam ☆☆$/g, "+89 Stamina ☆☆")
    .replace(/Watcher's Loam ☆☆☆$/g, "+105 Stamina ☆☆☆")

    // Stat simplifier
    .replace(/Agility/g, "Agi")
    .replace(/Avoidance/g, "Avoid")
    .replace(/Critical Strike/g, "Crit")
    .replace(/Intellect/g, "Int")
    .replace(/Mastery/g, "Mast")
    .replace(/Minor Speed Increase/g, "Speed")
    .replace(/Primary Stats/g, "Stats")
    .replace(/Stamina/g, "Stam")
    .replace(/Strength/g, "Str")
    .replace(/Versatility/g, "Vers")

    // Engineering
    .replace(
      /Carelessly cross a few frayed wires within the vicinity of a fallen ally in a desperate attempt to jolt them back to life with 60% health and 20% mana. Castable in combat. What could possibly go wrong\?\s+Cannot be used by players higher than level 70\./g,
      "Arclight Vital Correctors"
    )
    .replace(
      /Grants a magnetic charge that changes periodically\.\s+Aim a magnet toward an enemy player\. If your polarities are opposite, you both will be rooted for 6 sec\. If they are identical, you both will be repelled away from each other\.\s+Your target must also have a magnetic charge\.\s+Requires Level 58/g,
      "Polarity Amplifier"
    )
    .replace(/Grants the user invisibility for 14-18 sec\./g, "Grounded Circuitry")
    .replace(/Guarantees the next slotted Tinker use to succeed\. The cooldown of this effect is reduced at higher qualities\./g, "Plane Displacer")
    .replace(
      /Lock on to a distant enemy target, up to 12 to 60 yds away\. After 1\.5 sec, if your path remains unobstructed, you will charge toward them at the speed of sound\. Both you and your target will be stunned for 1\.5 sec upon collision\.\s+Requires Level 58/g,
      "Supercollide-O-Tron"
    )
    .replace(
      /Place a hidden Alarm-O-Turret on a nearby targeted location\. If an enemy player enters its detection radius, it will alert you of their presence and attempt to defend the area for 30 sec or until destroyed\./g,
      "Alarm-O-Turret"
    )
    .replace(/Reveal a flamethrower to deal [\d,]+ Fire damage in a cone in front of you for 6 sec\./g, "Breath of Neltharion")

    // idk
    .replace(/\|cnITEM_[A-Z]+_COLOR:(.*)\|r/g, "$1");

  // Better stars
  // .replace(/☆/g, "⭐");

  return stringVal;
}
