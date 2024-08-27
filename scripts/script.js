let siteVersion = getCookie("version", "1.0.0");
let characterInputData = getCookie("character-input-data", {});
let characterData = getCookie("character-data", {});
let activePage = getSessionCookie("active-page", "home");
let activeTab = getSessionCookie("active-tab", 0);
let lastUpdate = getCookie("last-update", 0);
let tabDetails = getCookie("tab-details", [{...defaultTab}]);

let filters = {
  home: [
    "index",
    "icon",
    "name",
    "server",
    "region",
    "class",
    "spec",
    "role",
    "lvl",
    "ilvl",
    "gender",
    "race",
    "faction",
    "guild",
    "mythicScore",
    "raidLFR",
    "raidNormal",
    "raidHeroic",
    "raidMythic",
    "profession1",
    "profession2",
    "professionScore",
    "lastOnline",
    "playtime",
    "links",
    "notes",
  ],
  professions: ["index", "icon", "name", "server", "region", "lvl", "ilvl", "race", "faction", "professionScore", "profession1", "profession2", "cooking", "fishing", "archaeology", "playtime", "notes"],
  class_stats: ["className", "count", "allianceCount", "hordeCount", "highestLevel", "highestAllianceLevel", "highestHordeLevel", "maxCount", "maxAllianceCount", "maxHordeCount", "showUnused"],
  race_stats: ["raceName", "count", "highestLevel", "maxCount", "showUnused"],
  gear: ["index", "icon", "name", "server", "region", "lvl", "ilvl", "tierCount", "craftedUnique", "uniqueGem", "pieceIlvl", "sockets", "enchants", "health", "mainStats", "secondaryStats", "tertiaryStats", "notes"],
  raid: ["index", "icon", "name", "server", "region", "lvl", "ilvl", "raidLFR", "raidNormal", "raidHeroic", "raidMythic", "notes"],
  mythic: ["index", "icon", "name", "server", "region", "lvl", "ilvl", "mythicScore", "thisWeekRunCount", "thisWeekRuns", "lastWeekRunCount", "lastWeekRuns", "season_runs"],
};
let translateFilters = {
  index: "Index",
  icon: "Icon",
  name: "Name",
  server: "Server",
  region: "Region",
  class: "Class",
  spec: "Spec",
  role: "Role",
  lvl: "Level",
  ilvl: "Item Level",
  gender: "Gender",
  race: "Race",
  faction: "Faction",
  guild: "Guild",
  mythicScore: "Mythic+ Score",
  raidLFR: "LFR Progress",
  raidNormal: "Normal Progress",
  raidHeroic: "Heroic Progress",
  raidMythic: "Mythic Progress",
  profession1: "Profession #1",
  profession2: "Profession #2",
  professionScore: "Profession Score",
  lastOnline: "Last Online",
  playtime: "Playtime",
  links: "External Links",
  notes: "Notes",
  cooking: "Cooking",
  fishing: "Fishing",
  archaeology: "Archaeology",
  count: "Count",
  allianceCount: "Alliance Count",
  hordeCount: "Horde Count",
  maxCount: "Max Level Count",
  maxAllianceCount: "Alliance Max Level Count",
  maxHordeCount: "Horde Max Level Count",
  highestLevel: "Highest Level",
  highestAllianceLevel: "Alliance Highest Level",
  highestHordeLevel: "Horde Highest Level",
  pieceIlvl: "Individual Item Level",
  tierCount: "Tier Count",
  uniqueGem: "Illimited",
  craftedUnique: "Embellished",
  sockets: "Sockets",
  enchants: "Enchants",
  stats: "Stats",
  thisWeekRunCount: "This Week's Run Count",
  thisWeekRuns: "This Week's Runs",
  lastWeekRunCount: "Last Week's Run Count",
  lastWeekRuns: "Last Week's Runs",
  season_runs: "Seasonal Best Runs",
  className: "Class Name",
  raceName: "Race Name",
  showUnused: "Show Unused",
  health: "Health",
  mainStats: "Main Stats",
  secondaryStats: "Secondary Stats",
  tertiaryStats: "Tertiary Stats",
};
let translateColumns = {
  ...translateFilters,
  index: "",
  icon: "",
  raceName: "",
  lvl: "Lvl",
  ilvl: "iLvl",
  mythicScore: "M+ Score",
  raidLFR: "LFR",
  raidNormal: "Normal",
  raidHeroic: "Heroic",
  raidMythic: "Mythic",
  professionScore: "Prof. Score",
  thisWeekRunCount: "This Week's Count",
  thisWeekRuns: "This Week's Runs",
  lastWeekRunCount: "Last Week's Count",
  lastWeekRuns: "Last Week's Runs",
  season_runs: "Seasonal Best Runs",
  className: "Class",
  raceName: "Race",
  allianceCount: "Alliance",
  hordeCount: "Horde",
  maxCount: "Max Levels",
  maxAllianceCount: "Alliance Max",
  maxHordeCount: "Horde Max",
  highestLevel: "Best Level",
  highestAllianceLevel: "Alliance Best",
  highestHordeLevel: "Horde Best",
  head: "Head",
  neck: "Neck",
  shoulders: "Shoulders",
  back: "Back",
  chest: "Chest",
  waist: "Waist",
  legs: "Legs",
  feet: "Feet",
  wrist: "Wrist",
  hands: "Hands",
  ring_1: "Ring 1",
  ring_2: "Ring 2",
  trinket_1: "Trinket 1",
  trinket_2: "Trinket 2",
  main_hand: "Main Hand",
  off_hand: "Off Hand",
  agility: "Agi",
  intellect: "Int",
  strength: "Str",
  crit: "Crit",
  haste: "Haste",
  mastery: "Mast",
  versatility: "Vers",
  avoidance: "Avoid",
  lifesteal: "Lifesteal",
  speed: "Speed",
};

let validate = {
  name: /^(?!.*(\p{L})\1{2})(\p{L}){2,12}$/u, // 2-12 letters, no more than two of the same letter in a row
  number: /^\d*(\.\d+)?$/,
  server: {
    us: /^(Aegwynn|Aerie Peak|Agamaggan|Aggramar|Akama|Alexstrasza|Alleria|Altar of Storms|Alterac Mountains|Aman'Thul|Andorhal|Anetheron|Antonidas|Anub'arak|Anvilmar|Arathor|Archimonde|Area 52|Argent Dawn|Arthas|Arygos|Auchindoun|Azgalor|Azjol-Nerub|Azralon|Azshara|Azuremyst|Baelgun|Balnazzar|Barthilas|Black Dragonflight|Blackhand|Blackrock|Blackwater Raiders|Blackwing Lair|Blade's Edge|Bladefist|Bleeding Hollow|Blood Furnace|Bloodhoof|Bloodscalp|Bonechewer|Borean Tundra|Boulderfist|Bronzebeard|Burning Blade|Burning Legion|Caelestrasz|Cairne|Cenarion Circle|Cenarius|Cho'gall|Chromaggus|Coilfang|Crushridge|Daggerspine|Dalaran|Dalvengyr|Dark Iron|Darkspear|Darrowmere|Dath'Remar|Dawnbringer|Deathwing|Demon Soul|Dentarg|Destromath|Dethecus|Detheroc|Doomhammer|Draenor|Dragonblight|Dragonmaw|Drak'Tharon|Drak'thul|Draka|Drakkari|Dreadmaul|Drenden|Dunemaul|Durotan|Duskwood|Earthen Ring|Echo Isles|Eitrigg|Eldre'Thalas|Elune|Emerald Dream|Eonar|Eredar|Executus|Exodar|Farstriders|Feathermoon|Fenris|Firetree|Fizzcrank|Frostmane|Frostmourne|Frostwolf|Galakrond|Gallywix|Garithos|Garona|Garrosh|Ghostlands|Gilneas|Gnomeregan|Goldrinn|Gorefiend|Gorgonnash|Greymane|Grizzly Hills|Gul'dan|Gundrak|Gurubashi|Hakkar|Haomarush|Hellscream|Hydraxis|Hyjal|Icecrown|Illidan|Jaedenar|Jubei'Thos|Kael'thas|Kalecgos|Kargath|Kel'Thuzad|Khadgar|Khaz Modan|Khaz'goroth|Kil'jaeden|Kilrogg|Kirin Tor|Korgath|Korialstrasz|Kul Tiras|Laughing Skull|Lethon|Lightbringer|Lightning's Blade|Lightninghoof|Llane|Lothar|Madoran|Maelstrom|Magtheridon|Maiev|Mal'Ganis|Malfurion|Malorne|Malygos|Mannoroth|Medivh|Misha|Mok'Nathal|Moon Guard|Moonrunner|Mug'thol|Muradin|Nagrand|Nathrezim|Nazgrel|Nazjatar|Nemesis|Ner'zhul|Nesingwary|Nordrassil|Norgannon|Onyxia|Perenolde|Proudmoore|Quel'Thalas|Quel'dorei|Ragnaros|Ravencrest|Ravenholdt|Rexxar|Rivendare|Runetotem|Sargeras|Saurfang|Scarlet Crusade|Scilla|Sen'jin|Sentinels|Shadow Council|Shadowmoon|Shadowsong|Shandris|Shattered Halls|Shattered Hand|Shu'halo|Silver Hand|Silvermoon|Sisters of Elune|Skullcrusher|Skywall|Smolderthorn|Spinebreaker|Spirestone|Staghelm|Steamwheedle Cartel|Stonemaul|Stormrage|Stormreaver|Stormscale|Suramar|Tanaris|Terenas|Terokkar|Thaurissan|The Forgotten Coast|The Scryers|The Underbog|The Venture Co|Thorium Brotherhood|Thrall|Thunderhorn|Thunderlord|Tichondrius|Tol Barad|Tortheldrin|Trollbane|Turalyon|Twisting Nether|Uldaman|Uldum|Undermine|Ursin|Uther|Vashj|Vek'nilash|Velen|Warsong|Whisperwind|Wildhammer|Windrunner|Winterhoof|Wyrmrest Accord|Ysera|Ysondre|Zangarmarsh|Zul'jin|Zuluhed)$/,
    eu: /^(Aegwynn|Aerie Peak|Agamaggan|Aggra \(Português\)|Aggramar|Ahn'Qiraj|Al'Akir|Alexstrasza|Alleria|Alonsus|Aman'Thul|Ambossar|Anachronos|Anetheron|Antonidas|Anub'arak|Arak-arahm|Arathi|Arathor|Archimonde|Area 52|Argent Dawn|Arthas|Arygos|Ashenvale|Aszune|Auchindoun|Azjol-Nerub|Azshara|Azuregos|Azuremyst|Baelgun|Balnazzar|Blackhand|Blackmoore|Blackrock|Blackscar|Blade's Edge|Bladefist|Bloodfeather|Bloodhoof|Bloodscalp|Blutkessel|Booty Bay|Borean Tundra|Boulderfist|Bronze Dragonflight|Bronzebeard|Burning Blade|Burning Legion|Burning Steppes|C'Thun|Chamber of Aspects|Chants éternels|Cho'gall|Chromaggus|Colinas Pardas|Confrérie du Thorium|Conseil des Ombres|Crushridge|Culte de la Rive noire|Daggerspine|Dalaran|Dalvengyr|Darkmoon Faire|Darksorrow|Darkspear|Das Konsortium|Das Syndikat|Deathguard|Deathweaver|Deathwing|Deepholm|Defias Brotherhood|Dentarg|Der Mithrilorden|Der Rat von Dalaran|Der abyssische Rat|Destromath|Dethecus|Die Aldor|Die Arguswacht|Die Nachtwache|Die Silberne Hand|Die Todeskrallen|Die ewige Wacht|Doomhammer|Draenor|Dragonblight|Dragonmaw|Drak'thul|Drek'Thar|Dun Modr|Dun Morogh|Dunemaul|Durotan|Earthen Ring|Echsenkessel|Eitrigg|Eldre'Thalas|Elune|Emerald Dream|Emeriss|Eonar|Eredar|Eversong|Executus|Exodar|Festung der Stürme|Fordragon|Forscherliga|Frostmane|Frostmourne|Frostwhisper|Frostwolf|Galakrond|Garona|Garrosh|Genjuros|Ghostlands|Gilneas|Goldrinn|Gordunni|Gorgonnash|Greymane|Grim Batol|Grom|Gul'dan|Hakkar|Haomarush|Hellfire|Hellscream|Howling Fjord|Hyjal|Illidan|Jaedenar|Kael'thas|Karazhan|Kargath|Kazzak|Kel'Thuzad|Khadgar|Khaz Modan|Khaz'goroth|Kil'jaeden|Kilrogg|Kirin Tor|Kor'gall|Krag'jin|Krasus|Kul Tiras|Kult der Verdammten|La Croisade écarlate|Laughing Skull|Les Clairvoyants|Les Sentinelles|Lich King|Lightbringer|Lightning's Blade|Lordaeron|Los Errantes|Lothar|Madmortem|Magtheridon|Mal'Ganis|Malfurion|Malorne|Malygos|Mannoroth|Marécage de Zangar|Mazrigos|Medivh|Minahonda|Moonglade|Mug'thol|Nagrand|Nathrezim|Naxxramas|Nazjatar|Nefarian|Nemesis|Neptulon|Ner'zhul|Nera'thor|Nethersturm|Nordrassil|Norgannon|Nozdormu|Onyxia|Outland|Perenolde|Pozzo dell'Eternità|Proudmoore|Quel'Thalas|Ragnaros|Rajaxx|Rashgarroth|Ravencrest|Ravenholdt|Razuvious|Rexxar|Runetotem|Sanguino|Sargeras|Saurfang|Scarshield Legion|Sen'jin|Shadowsong|Shattered Halls|Shattered Hand|Shattrath|Shen'dralar|Silvermoon|Sinstralis|Skullcrusher|Soulflayer|Spinebreaker|Sporeggar|Steamwheedle Cartel|Stormrage|Stormreaver|Stormscale|Sunstrider|Suramar|Sylvanas|Taerar|Talnivarr|Tarren Mill|Teldrassil|Temple noir|Terenas|Terokkar|Terrordar|The Maelstrom|The Sha'tar|The Venture Co|Theradras|Thermaplugg|Thrall|Throk'Feroth|Thunderhorn|Tichondrius|Tirion|Todeswache|Trollbane|Turalyon|Twilight's Hammer|Twisting Nether|Tyrande|Uldaman|Ulduar|Uldum|Un'Goro|Varimathras|Vashj|Vek'lor|Vek'nilash|Vol'jin|Wildhammer|Wrathbringer|Xavius|Ysera|Ysondre|Zenedar|Zirkel des Cenarius|Zul'jin|Zuluhed)$/,
    tw: /^(Alexstrasza|Azshara|Burning Legion|Cenarius|Dalaran|Deathwing|Durotan|Garona|Gul'dan|Hellscream|Hyjal|Malfurion|Norgannon|Rexxar|Stormrage|Wildhammer|Windrunner|Zul'jin)$/,
    kr: /^(Arthas|Arygos|Bleeding Hollow|Chillwind Point|Crystalpine Stinger|Demon Fall Canyon|Dragonmaw|Frostmane|Hellscream|Icecrown|Krol Blade|Light's Hope|Menethil|Nightsong|Old Blanchy|Order of the Cloud Serpent|Quel'dorei|Shadowmoon|Silverwing Hold|Skywall|Spirestone|Stormscale|Sundown Marsh|Whisperwind|World Tree|Wrathbringer|Zealot Blade)$/,
  },
  region: /[Uu][Ss]|[Ee][Uu]|[Tt][Ww]|[Kk][Rr]/, // us, eu, tw, kr
};

startup: {
  preinit();
  if (window.addEventListener) window.addEventListener("load", init, false);
  else if (window.attachEvent) window.attachEvent("onLoad", init);
  else init();
}

function importString(importString) {
  let importArray = importString.split("\n");
  importArray = importArray.filter((entry) => !/(,|\s+)[Rr]egion$/.test(entry));
  importArray = importArray.map((entry) => {
    let output = entry.replace(/(\p{L}+)\s((?:\p{L}+\s{0,1})+)\s([A-Z]{2})\s(\d*)\s(.*)|(\p{L}+),((?:\p{L}+\s{0,1})+),([A-Z]{2}),(\d*),(.*)/gu, '{"name": "$1$6", "server": "$2$7", "region": "$3$8", "played": "$4$9", "notes": "$5$10"}');
    console.log(entry, output);
    try {
      output = JSON.parse(output);
      output.played = output.played * 1 || null;
      output.notes = output.notes || null;
      return output;
    } catch (e) {
      console.log(output, e);
    }
  });
  return importArray.filter((a) => a != undefined && a.name && a.server && a.region);
}

function exportTab(tab = activeTab) {
  let {characters} = tabDetails[tab];
  let output = characters.map((charId) => {
    let {name, server, region, played, notes} = characterInputData[charId];
    return `${name},${server},${region},${played || ""},${notes || ""}`;
  });
  return output.join("\n");
}

function resetAllData() {
  if (confirm("Are you sure you want to clear everything?")) {
    ["character-data", "character-input-data", "last-update", "tab-details"].forEach((cookie) => delCookie(cookie));
    sessionStorage.clear();
    location.reload();
  }
}

// Temporary
/*
let characters = [
  {name: "Myndrios", server: "Illidan", region: "US", played: 375.7083333, notes: "Main"},
  {name: "Meggix", server: "Arthas", region: "US", played: 43.08333333, notes: ""},
  {name: "Jingwong", server: "Undermine", region: "US", played: 18.45833333, notes: ""},
  {name: "Vardinn", server: "Undermine", region: "US", played: 16.45833333, notes: ""},
  {name: "Elddrin", server: "Undermine", region: "US", played: 14.875, notes: ""},
  {name: "Telmnar", server: "Stormrage", region: "US", played: 13.75, notes: ""},
  {name: "Miraz", server: "Undermine", region: "US", played: 13.04166667, notes: ""},
  {name: "Reepicheap", server: "Stormrage", region: "US", played: 12.5, notes: ""},
  {name: "Bombadyll", server: "Illidan", region: "US", played: 10.08333333, notes: ""},
  {name: "Nikabrick", server: "Stormrage", region: "US", played: 9.625, notes: ""},
  {name: "Databank", server: "Undermine", region: "US", played: 8.125, notes: ""},
  {name: "Caspeon", server: "Undermine", region: "US", played: 6.291666667, notes: ""},
  {name: "Tavvros", server: "Arthas", region: "US", played: 4.833333333, notes: ""},
  {name: "Sopespian", server: "Stormrage", region: "US", played: 4.25, notes: ""},
  {name: "Zippleback", server: "Stormrage", region: "US", played: 3.916666667, notes: ""},
  {name: "Bricklethumb", server: "Stormrage", region: "US", played: 3.75, notes: ""},
  {name: "Thezoo", server: "Undermine", region: "US", played: 3.5, notes: ""},
  {name: "Mythiris", server: "Undermine", region: "US", played: 3.25, notes: ""},
  {name: "Waterewbyeen", server: "Undermine", region: "US", played: 3.145833333, notes: ""},
  {name: "Rabadash", server: "Undermine", region: "US", played: 3.083333333, notes: ""},
  {name: "Ramandu", server: "Undermine", region: "US", played: 3.083333333, notes: ""},
  {name: "Mynjrehoz", server: "Illidan", region: "US", played: 3, notes: ""},
  {name: "Narroel", server: "Undermine", region: "US", played: 2.958333333, notes: ""},
  {name: "Coriakin", server: "Undermine", region: "US", played: 2.625, notes: ""},
  {name: "Vixxee", server: "Stormrage", region: "US", played: 2.125, notes: ""},
  {name: "Mawgrim", server: "Moon Guard", region: "US", played: 2, notes: ""},
  {name: "Lucielinn", server: "Stormrage", region: "US", played: 1.958333333, notes: ""},
  {name: "Spivvens", server: "Anvilmar", region: "US", played: 1.64, notes: ""},
  {name: "Kitsatoru", server: "Illidan", region: "US", played: 1.5, notes: ""},
  {name: "Waterewbyin", server: "Arthas", region: "US", played: 1.395833333, notes: ""},
  {name: "Moncarde", server: "Arthas", region: "US", played: 1.333333333, notes: ""},
  {name: "Tarkaan", server: "Arthas", region: "US", played: 1.291666667, notes: ""},
  {name: "Electrokitsu", server: "Illidan", region: "US", played: 1.291666667, notes: ""},
  {name: "Peverall", server: "Arthas", region: "US", played: 0.9583333333, notes: ""},
  {name: "Armory", server: "Undermine", region: "US", played: 0.9166666667, notes: ""},
  {name: "Wateryubyeen", server: "Stormrage", region: "US", played: 0.875, notes: ""},
  {name: "Cruickshanks", server: "Stormrage", region: "US", played: 0.7083333333, notes: ""},
  {name: "Armoryvault", server: "Stormrage", region: "US", played: 0.6666666667, notes: ""},
  {name: "Foodpantry", server: "Stormrage", region: "US", played: 0.6458333333, notes: ""},
  {name: "Databanker", server: "Stormrage", region: "US", played: 0.625, notes: ""},
  {name: "Bankix", server: "Arthas", region: "US", played: 0.5833333333, notes: ""},
  {name: "Myndrios", server: "Anvilmar", region: "US", played: 0.5, notes: ""},
  {name: "Allmustgo", server: "Stormrage", region: "US", played: 0.375, notes: ""},
  {name: "Armory", server: "Arthas", region: "US", played: 0.3541666667, notes: ""},
  {name: "Thezoobrick", server: "Stormrage", region: "US", played: 0.3333333333, notes: ""},
  {name: "Lumivix", server: "Illidan", region: "US", played: 0.2986111111, notes: ""},
  {name: "Vixarconis", server: "Illidan", region: "US", played: 0.2708333333, notes: ""},
  {name: "Databank", server: "Anvilmar", region: "US", played: 0.2083333333, notes: ""},
  {name: "Velaryss", server: "Illidan", region: "US", played: 0.2, notes: ""},
  {name: "Aiwendyl", server: "Stormrage", region: "US", played: 0.125, notes: ""},
  {name: "Ellesthria", server: "Moon Guard", region: "US", played: 0.07291666667, notes: ""},
  {name: "Brannet", server: "Moon Guard", region: "US", played: 0.04166666667, notes: ""},
  {name: "Emmaryght", server: "Moon Guard", region: "US", played: 0.04166666667, notes: ""},
  {name: "Ketterlay", server: "Anvilmar", region: "US", played: 0.01375, notes: ""},
  {name: "Databank", server: "Illidan", region: "US", played: 0, notes: ""},
];

let raid_characters = [
  {name: "Alliegatör", server: "Illidan", region: "US"},
  {name: "Astraina", server: "Illidan", region: "US"},
  {name: "Azasål", server: "Illidan", region: "US"},
  {name: "Befin", server: "Illidan", region: "US"},
  {name: "Carmeldoom", server: "Illidan", region: "US"},
  {name: "Cryømage", server: "Illidan", region: "US"},
  {name: "Drannel", server: "Illidan", region: "US"},
  {name: "Fusionshock", server: "Illidan", region: "US"},
  {name: "Ihätemelee", server: "Illidan", region: "US"},
  {name: "Jãmiñ", server: "Illidan", region: "US"},
  {name: "Judàs", server: "Illidan", region: "US"},
  {name: "Lgtv", server: "Illidan", region: "US"},
  {name: "Lillitterbox", server: "Illidan", region: "US"},
  {name: "Lucaspriest", server: "Illidan", region: "US"},
  {name: "Lykenlova", server: "Illidan", region: "US"},
  {name: "Myeyesmilky", server: "Illidan", region: "US"},
  // {name: "Myndrios", server: "Illidan", region: "US"},
  {name: "Mysticrg", server: "Illidan", region: "US"},
  {name: "Nerzueldk", server: "Illidan", region: "US"},
  {name: "Padeenn", server: "Illidan", region: "US"},
  {name: "Ranér", server: "Illidan", region: "US"},
  {name: "Rosieca", server: "Illidan", region: "US"},
  {name: "Rosika", server: "Illidan", region: "US"},
  {name: "Sormorne", server: "Illidan", region: "US"},
  {name: "Stuubz", server: "Illidan", region: "US"},
  {name: "Sunshinelock", server: "Illidan", region: "US"},
  {name: "Whollyfrog", server: "Illidan", region: "US"},
  {name: "Yaadrasil", server: "Illidan", region: "US"},
];

let bad_raid = [
  {name: "Ceravex", server: "Area 52", region: "US"},
  {name: "Goatnoises", server: "Moon Guard", region: "US"},
  {name: "Katzuyo", server: "Moon Guard", region: "US"},
  {name: "Misotare", server: "Moon Guard", region: "US"},
  {name: "Kelläth", server: "Moon Guard", region: "US"},
  {name: "Slyin", server: "Moon Guard", region: "US"},
  {name: "Yndereth", server: "Moon Guard", region: "US"},
  {name: "Shortshocks", server: "Aegwynn", region: "US"},
  {name: "Crossybow", server: "Moon Guard", region: "US"},
  {name: "Truthseekerj", server: "Moon Guard", region: "US"},
  {name: "Roxsoxoff", server: "Moon Guard", region: "US"},
  {name: "Iminent", server: "Moon Guard", region: "US"},
  {name: "Deadandpissd", server: "Moon Guard", region: "US"},
  {name: "Tanazenset", server: "Moon Guard", region: "US"},
  {name: "Yaadrasil", server: "Illidan", region: "US"},
  {name: "Petya", server: "Moon Guard", region: "US"},
];

for (let character of characters) {
  var {name, server, region, played, notes} = character;
  // addCharacter(name, server, region, Math.round(played * 1440), notes);

  // tabDetails[0].characters.push(getCharId(name, server, region));
}

for (let character of raid_characters) {
  var {name, server, region} = character;
  //   addCharacter(name, server, region);

  // tabDetails[1].characters.push(getCharId(name, server, region));
}

for (let character of bad_raid) {
  var {name, server, region} = character;
  //   addCharacter(name, server, region);

  // tabDetails[1].characters.push(getCharId(name, server, region));
  // addCharacter(name, server, region, undefined, undefined, 2);
}
*/

// Code to be run before the page loads
function preinit() {
  // Check for the client key and only continue once that is done
  getAccessToken()
    .then(() => {
      // Refresh data if it hasn't been updated in a 15 minutes (or whatever updateTime is set to in settings)
      let now = new Date();
      if (!lastUpdate || lastUpdate + updateTime < now.valueOf()) {
        lastUpdate = now.valueOf();
        setCookie("last-update", lastUpdate);
        populateData();
      }
    })
    .catch(() => {});
}

// Code to be run once the page loads
function init() {
  // Add regex patterns to inputs
  // document.querySelectorAll("input[type='number']").forEach((element, i) => {
  //   element.pattern = `${validate.number}`.replace(/\/(.*)\/.*/, "$1");
  // });
  // document.querySelectorAll("input[name='name']").forEach((element, i) => {
  //   element.pattern = `${validate.name}`.replace(/\/(.*)\/.*/, "$1");
  // });

  events();

  // populate the region's server data list
  populateServers();

  // Check for the client key and only continue once that is done
  getAccessToken()
    .then(() => {
      // Set the tabs and filters up
      setupTabs();
      setupFilters();

      // Activate the proper page and tab
      document.querySelector(`nav [data-page-id="${activePage}"]`).classList.add("active");

      // Display the table
      buildTable();
    })
    .catch((error) => {
      if (error == "Invalid Client Credentials") {
        if (clientId) document.querySelector("input[name='clientId']").value = clientId;
        if (clientSecret) document.querySelector("input[name='clientSecret']").value = clientSecret;
        activateDialog("clientKey");
      }
    });
}

// Events to be put on elements
function events() {
  // Submit client key
  document.querySelector("#clientKey .submit button[name='submit']").addEventListener("click", clientKeySubmit);
  document.querySelector("#clientKey input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") clientKeySubmit();
  });
  function clientKeySubmit() {
    clientId = document.querySelector("input[name='clientId']").value;
    clientSecret = document.querySelector("input[name='clientSecret']").value;
    // console.log("Click:", {clientId, clientSecret});

    getAccessToken()
      .then(() => {
        // console.log("Success Click:", {clientId, clientSecret});
        setCookie("client-id", clientId);
        setCookie("client-secret", clientSecret);
        document.querySelector("#clientKey .error").innerText = "";
        closeDialog();
        preinit();
        init();
      })
      .catch((error) => {
        if (error == "Invalid Client Credentials") {
          // console.log("Fail Click:", {error, clientId, clientSecret});
          document.querySelector("#clientKey .error").innerText = error;
        }
      });
  }

  // clicks used when you want to track a click on anything else
  document.addEventListener("mousedown", (event) => {
    // Hide the filters popup if you click anywhere other than the popup
    let ignoreEles = [...document.querySelectorAll("tr:has(th) > td:has(img), tr:has(th) > td > img, .editPopup, .editPopup *, nav *")];
    if (!ignoreEles.includes(event.target)) document.querySelector(".editPopup.active")?.classList?.remove("active");

    // Close any dialogs that are open when you click somewhere else
    ignoreEles = [...document.querySelectorAll('dialog[open], dialog[open] *, dialog.active, dialog.active *, .addCharacterButton, tr:not(:has(th)) td:has(img[alt="dots"])')];
    if (!ignoreEles.includes(event.target)) closeDialog();
  });

  // Set the active page
  document.querySelectorAll("nav > [data-page-id]").forEach((element) => {
    element.addEventListener("click", (event) => {
      let ele = event.target;
      document.querySelector("nav > .active")?.classList?.remove("active");
      ele.classList.toggle("active");
      activePage = ele.dataset.pageId;
      setupFilters();
      buildTable();
      setSessionCookie("active-page", activePage);
    });
  });

  // Validate number inputs
  // document.querySelectorAll("input[type='number']").forEach((element) => {
  //   element.addEventListener("change", (event) => {
  //     if (!element.value) element.classList.add("invalid");
  //     else element.classList.remove("invalid");
  //   });
  // });

  // Validate name inputs
  document.querySelectorAll("input[name='name']").forEach((element) => {
    element.addEventListener("change", (event) => {
      validateName(element);
    });
  });
  function validateName(element) {
    if (validate.name.test(element.value.toLowerCase())) element.classList.remove("invalid");
    else element.classList.add("invalid");
  }

  // Validate server inputs on server change
  document.querySelectorAll("input[name='realm']").forEach((element) => {
    element.addEventListener("change", (event) => {
      validateServer(element);
    });
  });
  function validateServer(element) {
    let region = document.querySelector(".active [name='region']").value.toLowerCase();
    if (validate.server[region]?.test(element.value)) element.classList.remove("invalid");
    else element.classList.add("invalid");
  }

  // Validate server inputs on region change
  document.querySelectorAll("select[name='region']").forEach((element) => {
    element.addEventListener("change", (event) => {
      validateRegion(element);
    });
  });
  function validateRegion(element) {
    let region = element.value.toLowerCase();
    let realm = element.previousElementSibling;

    if (validate.server[region]?.test(realm.value)) realm.classList.remove("invalid");
    else realm.classList.add("invalid");
  }

  // Change the dataset whenever a region input is changed
  document.querySelectorAll("select[name='region']").forEach((element) => {
    element.addEventListener("change", (event) => {
      let region = element.value;
      document.querySelector(".active [name='realm']").setAttribute("list", region.toLowerCase() + "-servers");
    });
  });

  // Open the add character dialog
  document.querySelectorAll(".addCharacterButton, .characterAdd").forEach((element) => {
    element.addEventListener("click", (event) => {
      document.querySelector("#characterAdd .error").innerText = "";
      let [realm, region] = getPopularServer();
      [...document.querySelectorAll("#characterAdd input, #characterAdd textarea")].forEach((input) => {
        input.value = "";
      });
      document.querySelector("#characterAdd [name='name']").focus();
      document.querySelector("#characterAdd [name='realm']").value = realm;
      document.querySelector("#characterAdd [name='realm']").setAttribute("list", region.toLowerCase() + "-servers");
      document.querySelector("#characterAdd [name='region']").value = region;
      document.querySelectorAll(".invalid").forEach((element, i) => {
        element.classList.remove("invalid");
      });

      activateDialog("characterAdd");
    });
  });

  // Button to submit a new character
  document.querySelector("#characterAdd button[name='submit']").addEventListener("click", characterAddSubmit);
  document.querySelector("#characterAdd").addEventListener("keydown", (event) => {
    if (event.key === "Enter") characterAddSubmit();
  });
  function characterAddSubmit() {
    let name = document.querySelector("#characterAdd [name='name']").value;
    let server = document.querySelector("#characterAdd [name='realm']").value;
    let region = document.querySelector("#characterAdd [name='region']").value;
    let played = round(document.querySelector("#characterAdd [name='days']").value * 60 * 24 + document.querySelector("#characterAdd [name='hours']").value * 60 + document.querySelector("#characterAdd [name='minutes']").value * 1);
    notes = document.querySelector("#characterAdd textArea[name='notes']").value.replace(/"/g, "&quot;").replace(/&/g, "&amp;").replace(/'/g, "&#039;").replace(/;/g, "&#59;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // console.log(name, server, region, played, notes);
    try {
      addCharacter(name, server, region, played || null, notes || null);
      closeDialog();
    } catch (e) {
      console.error(e);
      document.querySelector("#characterAdd .error").innerText = `${e}`.replace("", "");
    }
  }

  // Button to submit an edited character
  document.querySelector("#characterEdit button[name='submit']").addEventListener("click", characterEditSubmit);
  document.querySelector("#characterEdit").addEventListener("keydown", (event) => {
    // console.log(event.key);
    if (event.key === "Enter") characterEditSubmit();
  });
  function characterEditSubmit() {
    let prevName = document.querySelector("#characterEdit [name='prev-name']").value;
    let prevServer = document.querySelector("#characterEdit [name='prev-realm']").value;
    let prevRegion = document.querySelector("#characterEdit [name='prev-region']").value;

    let name = document.querySelector("#characterEdit [name='name']").value;
    let server = document.querySelector("#characterEdit [name='realm']").value;
    let region = document.querySelector("#characterEdit [name='region']").value;
    let played = round(document.querySelector("#characterEdit [name='days']").value * 60 * 24 + document.querySelector("#characterEdit [name='hours']").value * 60 + document.querySelector("#characterEdit [name='minutes']").value * 1);
    notes = document.querySelector("#characterEdit textArea[name='notes']").value.replace(/"/g, "&quot;").replace(/&/g, "&amp;").replace(/'/g, "&#039;").replace(/;/g, "&#59;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // console.log(name, server, region, played, notes);
    try {
      addCharacter(name, server, region, played || null, notes || null);
      populateCharacter(name, server, region, played || null, notes || null).then(() => {
        if (name != prevName || server != prevServer || region != prevRegion) removeCharacter(prevName, prevServer, prevRegion);
        closeDialog();
      });
    } catch (error) {
      console.error(error);
      document.querySelector("#characterEdit .error").innerText = `${error}`.replace(/.*Error: /, "");
    }
  }

  // Button to remove a character
  document.querySelector("#characterEdit button[name='delete']").addEventListener("click", (event) => {
    let prevName = document.querySelector("#characterEdit [name='prev-name']").value;
    let prevServer = document.querySelector("#characterEdit [name='prev-realm']").value;
    let prevRegion = document.querySelector("#characterEdit [name='prev-region']").value;
    removeCharacter(prevName, prevServer, prevRegion);
    closeDialog();
  });

  // Open the bulk add characters dialog
  document.querySelectorAll(".batchAdd").forEach((element) => {
    element.addEventListener("click", (event) => {
      let allRows = document.querySelectorAll("#batchAdd .compactCharacterInput");
      for (let i = 1; i < allRows.length; i++) allRows[i].remove();

      // document.querySelector("#batchAdd .error").innerText = "";
      let [realm, region] = getPopularServer();
      [...document.querySelectorAll("#batchAdd input")].forEach((input) => {
        input.value = "";
      });

      let nameInput = document.querySelector("#batchAdd [name='name']");
      let realmInput = document.querySelector("#batchAdd [name='realm']");
      let regionInput = document.querySelector("#batchAdd [name='region']");

      nameInput.value = "";
      nameInput.focus();
      realmInput.value = realm;
      realmInput.setAttribute("list", region.toLowerCase() + "-servers");
      regionInput.value = region;

      document.querySelectorAll(".invalid").forEach((element) => {
        element.classList.remove("invalid");
      });

      activateDialog("batchAdd");
    });
  });

  // Add a new row to the bulk add section anytime a name input gets entered
  document.querySelector("#batchAdd [name='name']").addEventListener("change", bulkAddAddRow);
  function bulkAddAddRow() {
    let allRows = document.querySelectorAll("#batchAdd .compactCharacterInput");
    let original = allRows[allRows.length - 1];
    if (original.querySelector("input[name='name']").value !== "") {
      let duplicate = original.cloneNode(true);
      let nameInput = duplicate.querySelector("input[name='name']");

      nameInput.value = "";
      nameInput.classList.remove("invalid");
      nameInput.addEventListener("change", (event) => validateName(nameInput));
      nameInput.addEventListener("change", (event) => {
        let allRows = document.querySelectorAll(".compactCharacterInput");
        let lastRow = allRows[allRows.length - 1];
        let nameInput = lastRow.querySelector("input[name='name']");
        clearEmptyRows();
        bulkAddAddRow();
      });

      let realmInput = duplicate.querySelector("input[name='realm']");
      realmInput.addEventListener("change", (event) => validateServer(realmInput));

      let regionInput = duplicate.querySelector("select[name='region']");
      regionInput.addEventListener("change", (event) => validateRegion(regionInput));
      regionInput.addEventListener("change", (event) => {
        let region = realmInput.value;
        realmInput.setAttribute("list", region.toLowerCase() + "-servers");
      });

      original.insertAdjacentElement("afterend", duplicate);
    }

    function clearEmptyRows() {
      let allRows = document.querySelectorAll("#batchAdd .compactCharacterInput");
      allRows.forEach((row, i) => {
        let name = row.querySelector("input[name='name']").value;
        let days = row.querySelector("input[name='days']").value;
        let hours = row.querySelector("input[name='hours']").value;
        let minutes = row.querySelector("input[name='minutes']").value;

        if (name == "" && days == "" && hours == "" && minutes == "") row.remove();
      });
    }
  }

  // Button to submit all the bulk characters
  document.querySelector("#batchAdd button[name='submit']").addEventListener("click", batchAddSubmit);
  function batchAddSubmit() {
    let allRows = document.querySelectorAll("#batchAdd .compactCharacterInput");

    allRows.forEach((row, i) => {
      let name = row.querySelector("[name='name']").value;
      let server = row.querySelector("[name='realm']").value;
      let region = row.querySelector("[name='region']").value;
      let played = round(row.querySelector("[name='days']").value * 60 * 24 + row.querySelector("[name='hours']").value * 60 + row.querySelector("[name='minutes']").value * 1);
      // console.log(name, server, region, played, notes);

      if (name && server) {
        try {
          addCharacter(name, server, region, played || null);
        } catch (e) {
          console.error(e);
        }
      }
    });

    closeDialog();
  }

  // Open the import characters dialog
  document.querySelectorAll(".importAdd").forEach((element) => {
    element.addEventListener("click", (event) => {
      let importBox = document.querySelector("#importAdd textarea[name='import']");
      importBox.value = "";

      activateDialog("importAdd");
    });
  });

  // Button to submit all the omport characters
  document.querySelector("#importAdd button[name='submit']").addEventListener("click", (event) => {
    let importBox = document.querySelector("#importAdd textarea[name='import']");
    let characters = importString(importBox.value);
    characters.forEach((character) => {
      let {name, server, region, played, notes} = character;
      addCharacter(name, server, region, played, notes);
    });

    closeDialog();
  });
}

// Get and display tabs
function setupTabs() {
  let tabFolder = document.querySelector(`#tabs`);
  tabFolder.innerHTML = "";

  tabDetails.forEach((tab, i) => {
    tabFolder.innerHTML += `<div class="tab" data-tab-id="${i}">${tab.name}<p class="close-tab">x</p></div>`;
  });
  if (tabDetails.length < maxTabs) tabFolder.innerHTML += `<div class="tab" id="addTab">+</div>`;

  document.querySelector(`#tabs [data-tab-id="${activeTab}"]`).classList.add("active");

  // Add an event to set the active tab
  document.querySelectorAll("#tabs > [data-tab-id]").forEach((element, i) => {
    element.addEventListener("click", (event) => {
      if (event.target == element) {
        document.querySelector("#tabs > .active")?.classList?.remove("active");
        element.classList.add("active");
        activeTab = parseInt(element.dataset.tabId);
        buildTable();
        setupFilters();
        setSessionCookie("active-tab", activeTab);
      }
    });
  });

  // Add an event to set the active tab
  document.querySelectorAll("#tabs .close-tab").forEach((element, i) => {
    element.addEventListener("click", (event) => {
      let tab = parseInt(element.parentElement.dataset.tabId);
      removeTab(tab);
    });
  });

  // Add an event to add a tab
  document.querySelector("#addTab")?.addEventListener("click", addTab);
}

// Get and setup the popup filters window to control the active columns
function setupFilters() {
  let allFilters = filters[activePage];
  let activeFilters = tabDetails[activeTab].filter[activePage];
  let popup = document.querySelector(".editPopup");
  popup.innerHTML = "";

  allFilters.forEach((filter, i) => {
    is_active = activeFilters.includes(filter);
    popup.innerHTML += `<p data-filter-id="${filter}"${is_active ? ' class="active"' : ""}>${translateFilters[filter] || filter}</p>`;
  });

  // Add events to toggle any filter in the filter popup
  document.querySelectorAll(".editPopup > p").forEach((element, i) => {
    element.addEventListener("click", (event) => {
      event.target.classList.toggle("active");
      // update the active filters
      tabDetails[activeTab].filter[activePage] = [...document.querySelectorAll(".editPopup > .active")].map((a) => a.dataset.filterId);
      buildTable();
      setCookie("tab-details", tabDetails);
    });
  });
}

// Add a tab to the list
function addTab() {
  let newTab = {...tabDetails[activeTab]};
  newTab.characters = [];
  newTab.name = "Page " + (tabDetails.length + 1);
  tabDetails.push(newTab);
  setupTabs();
  setCookie("tab-details", tabDetails);
}

// Delete a tab and all associated characters
function removeTab(id) {
  if (confirm(`Are you sure you want to delete tab "${tabDetails[id].name}"?`)) {
    tabDetails.splice(id, 1);
    if (activeTab >= id) activeTab--;
    setupTabs();

    let registeredDataCharacters = Object.keys(characterData);
    let registeredInputCharacters = Object.keys(characterInputData);
    let desiredCharacters = [];
    for (let i = 0; i < tabDetails.length; i++) desiredCharacters.push(...tabDetails[i].characters);
    desiredCharacters = [...new Set(desiredCharacters)];

    let deleteData = registeredDataCharacters.filter((character) => !desiredCharacters.includes(character));
    let deleteInput = registeredInputCharacters.filter((character) => !desiredCharacters.includes(character));
    deleteData.forEach((character) => delete characterData[character]);
    deleteInput.forEach((character) => delete characterInputData[character]);

    setSessionCookie("active-tab", activeTab);
    setCookie("tab-details", tabDetails);
    setCookie("character-input-data", characterInputData);
    setCookie("character-data", characterData);

    buildTable();
  }
}

// Function to populate the server data list for the form entries whenever the region is changed
function populateServers() {
  ["us", "eu", "tw", "kr"].forEach((region, i) => {
    let servers = `${validate.server[region]}`.replace(/\^\(|\\|\/|\)\$/g, "").split("|");
    let list = document.querySelector(`datalist#${region}-servers`);

    let output = "";
    for (let server of servers) output += `<option value="${server}">`;
    list.innerHTML = output;
  });
}

// adding character to the database
function addCharacter(name, server, region = "US", played, notes, tab = activeTab) {
  // Validate the input values
  let isValid = validate.name.test(name.toLowerCase()) && validate.server?.[region.toLowerCase()]?.test(server) && validate.region.test(region) && (typeof played == "number" || !played);

  if (isValid) {
    let id = getCharId(name, server, region);
    let character = {name, server, region};
    if (played !== undefined) character.played = played;
    if (notes !== undefined) character.notes = notes;

    characterInputData[id] = character;
    setCookie("character-input-data", characterInputData);

    tabDetails[tab].characters = [...new Set([...tabDetails[tab].characters, id])];
    setCookie("tab-details", tabDetails);

    populateCharacter(name, server, region);

    // Return the character object
    return character;
  } else {
    // If input values are invalid, throw appropriate errors
    if (!validate.name.test(name.toLowerCase())) throw new Error(name + " is not a valid character name.");
    else if (!validate.region.test(region)) throw new Error(region + " is not a valid region.");
    else if (!validate.server[region.toLowerCase()]?.test(server)) throw new Error(server + " is not a valid server.");
    else if (typeof played != "number" && played) throw new Error(played + " is not a valid number for playtime.");
  }
}

// remove a character from the database
function removeCharacter(name, server, region, tab = activeTab) {
  let id = getCharId(name, server, region);
  tabDetails[tab].characters = tabDetails[tab].characters.filter((character) => character != id);
  setCookie("tab-details", tabDetails);

  let activeCharacters = [];
  tabDetails.map((a) => activeCharacters.push(...a.characters));
  activeCharacters = [...new Set(activeCharacters)];
  let isRemoved = !activeCharacters.includes(id);

  if (isRemoved) {
    delete characterInputData[id];
    delete characterData[id];
    setCookie("character-input-data", characterInputData);
    setCookie("character-data", characterData);
    buildTable();
  }
}

// Build the table to be displayed and sorted
function buildTable() {
  let columns = tabDetails[activeTab].filter[activePage];
  let {characters} = tabDetails[activeTab];
  let sorts = tabDetails[activeTab].sort[activePage];

  let table = document.querySelector("table > thead");
  table.innerHTML = "";

  let prehead = document.createElement("tr");
  let head = document.createElement("tr");

  let weirdTableHeads = ["pieceIlvl", "sockets", "enchants", "mainStats", "secondaryStats", "tertiaryStats"];
  if (weirdTableHeads.some((value) => columns.includes(value))) prehead.innerHTML = `<td rowspan="2"><img src="assets/dots.svg" alt="dots" /></td>`;
  else head.innerHTML = `<td><img src="assets/dots.svg" alt="dots" /></td>`;
  columns.forEach((item, i) => {
    if (!/showUnused|pieceIlvl|sockets|enchants|mainStats|secondaryStats|tertiaryStats/.test(item)) {
      prehead.innerHTML += `<th data-column-id="${item}"></th>`;
      head.innerHTML += `<th data-column-id="${item}">${translateColumns[item]}</th>`;
    }
    if (/pieceIlvl/.test(item)) {
      let slots = ["head", "neck", "shoulders", "back", "chest", "waist", "legs", "feet", "wrist", "hands", "ring_1", "ring_2", "trinket_1", "trinket_2", "main_hand", "off_hand"];
      prehead.innerHTML += `<th data-column-id="${item}" colspan="${slots.length}">${translateColumns[item]}</th>`;
      slots.forEach((slot, i) => (head.innerHTML += `<th data-column-id="${slot}">${translateColumns[slot]}</th>`));
    }
    if (/sockets/.test(item)) {
      let slots = ["head", "neck", "waist", "wrist", "ring_1", "ring_2"];
      prehead.innerHTML += `<th data-column-id="${item}" colspan="${slots.length + 2}">${translateColumns[item]}</th>`;
      slots.forEach((slot, i) => (head.innerHTML += `<th data-column-id="${slot}"${slot == "neck" ? 'colspan="3"' : ""}>${translateColumns[slot]}</th>`));
    }
    if (/enchants/.test(item)) {
      let slots = ["head", "back", "chest", "wrist", "legs", "feet", "ring_1", "ring_2", "main_hand", "off_hand"];
      prehead.innerHTML += `<th data-column-id="${item}" colspan="${slots.length}">${translateColumns[item]}</th>`;
      slots.forEach((slot, i) => (head.innerHTML += `<th data-column-id="${slot}">${translateColumns[slot]}</th>`));
    }
    if (/mainStats/.test(item)) {
      let stats = ["agility", "intellect", "strength"];
      prehead.innerHTML += `<th data-column-id="${item}" colspan="${stats.length}">${translateColumns[item]}</th>`;
      stats.forEach((stat, i) => (head.innerHTML += `<th data-column-id="${stat}">${translateColumns[stat]}</th>`));
    }
    if (/secondaryStats/.test(item)) {
      let stats = ["crit", "haste", "mastery", "versatility"];
      prehead.innerHTML += `<th data-column-id="${item}" colspan="${stats.length}">${translateColumns[item]}</th>`;
      stats.forEach((stat, i) => (head.innerHTML += `<th data-column-id="${stat}">${translateColumns[stat]}</th>`));
    }
    if (/tertiaryStats/.test(item)) {
      let stats = ["avoidance", "lifesteal", "speed"];
      prehead.innerHTML += `<th data-column-id="${item}" colspan="${stats.length}">${translateColumns[item]}</th>`;
      stats.forEach((stat, i) => (head.innerHTML += `<th data-column-id="${stat}">${translateColumns[stat]}</th>`));
    }
  });

  // if (columns.includes("pieceIlvl")) table.append(prehead);
  if (weirdTableHeads.some((value) => columns.includes(value))) table.append(prehead);
  table.append(head);

  table = document.querySelector("table > tbody");
  table.innerHTML = "";

  // If the tab has no characters tied to it, enter the add character dialog and exit the table construction
  if (characters.length == 0) {
    document.querySelector("#characterAdd .error").innerText = "";
    let [realm, region] = getPopularServer();
    [...document.querySelectorAll("#characterAdd input, #characterAdd textarea")].forEach((input) => {
      input.value = "";
    });
    document.querySelector("#characterAdd [name='realm']").value = realm;
    document.querySelector("#characterAdd [name='realm']").setAttribute("list", region.toLowerCase() + "-servers");
    document.querySelector("#characterAdd [name='region']").value = region;
    document.querySelectorAll(".invalid").forEach((element, i) => {
      element.classList.remove("invalid");
    });
    activateDialog("characterAdd");
    return;
  }

  let body = "";
  let index = 0;
  let maxes;
  switch (activePage) {
    case "home":
      characters.forEach((characterId, i) => {
        index++;
        let character = characterData[characterId];
        if (!character?.failed && character) {
          body += `<tr data-char-id="${characterId}"><td><img src="assets/dots.svg" alt="dots" /></td>`;
          if (columns.includes("index")) body += `<td data-filter-id="index">${index}</td>`;
          if (columns.includes("icon")) body += `<td><img src="${character.media?.avatar || "assets/unknown.png"}" alt="icon" /></td>`;
          if (columns.includes("name")) body += `<td data-filter-id="name" class="${fixClass(character.class?.toLowerCase()) + "-text"}">${character.name}</td>`;
          if (columns.includes("server")) body += `<td data-filter-id="server">${character.server}</td>`;
          if (columns.includes("region")) body += `<td data-filter-id="region">${character.region}</td>`;
          if (columns.includes("class")) body += `<td data-filter-id="class" class="${fixClass(character.class?.toLowerCase())}-text">${character.class}</td>`;
          if (columns.includes("spec")) body += `<td data-filter-id="spec" class="${(getRole(character.class, character.spec) || "").replace(/Ranged |Melee /g, "").toLowerCase()}-text">${character.spec || ""}</td>`;
          if (columns.includes("role"))
            body += `<td data-filter-id="role" class="${(getRole(character.class, character.spec) || "").replace(/Ranged |Melee /g, "").toLowerCase()}-text">${getRole(character.class, character.spec) || ""}</td>`;
          if (columns.includes("lvl")) body += `<td data-filter-id="lvl">${character.level}</td>`;
          if (columns.includes("ilvl")) body += `<td data-filter-id="ilvl" class="${getGearRarity(character.average_ilvl)}-text">${character.average_ilvl}</td>`;
          if (columns.includes("gender")) body += `<td data-filter-id="gender">${character.gender}</td>`;
          if (columns.includes("race")) body += `<td data-filter-id="race" class="${character.faction?.toLowerCase()}-text">${character.race}</td>`;
          if (columns.includes("faction")) body += `<td data-filter-id="faction" class="${character.faction?.toLowerCase()}-text">${character.faction}</td>`;
          if (columns.includes("guild")) body += `<td data-filter-id="guild">${character.guild || ""}</td>`;
          if (columns.includes("mythicScore")) body += `<td data-filter-id="mythicScore" ${character.mythic_plus ? `style="color:${character.mythic_plus?.color}"` : ""}>${round(character.mythic_plus?.rating) || ""}</td>`;
          ["LFR", "Normal", "Heroic", "Mythic"].forEach((difficulty, i) => {
            if (columns.includes("raid" + difficulty)) {
              body += `<td data-filter-id="raid${difficulty}">`;
              difficulty = difficulty.toLowerCase();
              body +=
                character.raid_progress
                  ?.map((prog) => `<span style="color:${prog[difficulty] ? colorScale(prog[difficulty].match(/\d+/g)[0] / prog[difficulty].match(/\d+/g)[1]) : colorScale(0)}">${prog[difficulty] || "-"}</span>`)
                  ?.join(" ") || "";
              body += "</td>";
            }
          });
          if (columns.includes("profession1")) body += `<td data-filter-id="profession1">${character.professions?.profession1?.name || ""}</td>`;
          if (columns.includes("profession2")) body += `<td data-filter-id="profession2">${character.professions?.profession2?.name || ""}</td>`;
          if (columns.includes("professionScore")) body += `<td style="color: ${colorScale((character.professions?.score || 0) / professionScores.max)}" data-filter-id="professionScore">${character.professions?.score || ""}</td>`;
          if (columns.includes("lastOnline")) body += `<td data-filter-id="lastOnline">${convertTime(new Date().getTime() - new Date(character.last_login).getTime())}</td>`;
          if (columns.includes("playtime")) body += `<td data-filter-id="playtime">${character.played ? convertTime(character.played, "minutes") : ""}</td>`;
          if (columns.includes("links"))
            body += `<td data-filter-id="links">
            <a href="https://raider.io/characters/${character.region.toLowerCase()}/${character.server}/${character.name}" target="_blank">
              <img src="https://cdn.raiderio.net/images/apple-touch-icon-114x114.png" alt="Raider IO" title="Raider IO" />
            </a><a href="https://www.warcraftlogs.com/character/${character.region.toLowerCase()}/${character.server}/${character.name}" target="_blank">
              <img src="https://cdn.raiderio.net/assets/img/warcraftlogs-icon-1da8feba74b4d68aa3d428ab7f851275.png" alt="Warcraft Logs" title="Warcraft Logs" />
            </a><a href="https://wowanalyzer.com/character/${character.region}/${character.server}/${character.name}" target="_blank">
              <img src="https://wowanalyzer.com/favicon-96x96.png" alt="WoW Analyzer" title="WoW Analyzer" />
            </a><a href="https://www.wipefest.gg/character/${character.name}/${character.server}/${character.region}?gameVersion=warcraft-live" target="_blank">
              <img src="https://www.wipefest.gg/logo-circle.84ad348907354f755c3f.png" alt="Wipefest" title="Wipefest" />
            </a><a href="https://worldofwarcraft.blizzard.com/en-us/character/${character.region.toLowerCase()}/${character.server.toLowerCase()}/${character.name.toLowerCase()}" target="_blank">
              <img src="https://images.blz-contentstack.com/v3/assets/blt72f16e066f85e164/bltc3d5627fa96394bf/world-of-warcraft.webp" alt="WoW Armory" title="WoW Armory" />
            </a>
          </td>`;
          if (columns.includes("notes")) body += `<td data-filter-id="notes">${character.notes || ""}</td>`;
        } else {
          let spread = getTableWidth();
          ["index", "icon", "name", "server", "region", "playtime", "links", "notes"].forEach((item, i) => {
            if (columns.includes(item)) spread--;
          });

          body += `<tr data-char-id="${characterId}" class="missing"><td><img src="assets/dots.svg" alt="dots" /></td>`;
          if (columns.includes("index")) body += `<td data-filter-id="index">${index}</td>`;
          if (columns.includes("icon")) body += `<td data-filter-id="icon"><img src="assets/unknown.png" alt="icon" /></td>`;
          if (columns.includes("name")) body += `<td data-filter-id="name">${character?.name}</td>`;
          if (columns.includes("server")) body += `<td data-filter-id="server">${character?.server}</td>`;
          if (columns.includes("region")) body += `<td data-filter-id="region">${character?.region}</td>`;
          body += `<td colspan="${spread}">Character not found</td>`;
          if (columns.includes("playtime")) body += `<td data-filter-id="playtime">${character?.played ? convertTime(character?.played, "minutes") : ""}</td>`;
          if (columns.includes("links"))
            body += `<td data-filter-id="links">
              </a><a href="https://worldofwarcraft.blizzard.com/en-us/character/${character.region.toLowerCase()}/${character.server.toLowerCase()}/${character.name.toLowerCase()}" target="_blank">
                <img src="https://images.blz-contentstack.com/v3/assets/blt72f16e066f85e164/bltc3d5627fa96394bf/world-of-warcraft.webp" alt="WoW Armory" title="WoW Armory" />
              </a>
            </td>`;
          if (columns.includes("notes")) body += `<td data-filter-id="notes">${character?.notes || ""}</td>`;
        }
      });
      body += "</tr>";
      table.innerHTML += body;
      break;

    case "professions":
      characters.forEach((characterId, i) => {
        let character = characterData[characterId];
        if (!character.failed) {
          body += `<tr data-char-id="${characterId}"><td><img src="assets/dots.svg" alt="dots" /></td>`;
          if (columns.includes("index")) body += `<td data-filter-id="index">${index}</td>`;
          if (columns.includes("icon")) body += `<td><img src="${character.media?.avatar || "assets/unknown.png"}" alt="icon" /></td>`;
          if (columns.includes("name")) body += `<td data-filter-id="name" class="${fixClass(character.class?.toLowerCase()) + "-text"}">${character.name}</td>`;
          if (columns.includes("server")) body += `<td data-filter-id="server">${character.server}</td>`;
          if (columns.includes("region")) body += `<td data-filter-id="region">${character.region}</td>`;
          if (columns.includes("lvl")) body += `<td data-filter-id="lvl">${character.level}</td>`;
          if (columns.includes("ilvl")) body += `<td data-filter-id="ilvl" class="${getGearRarity(character.average_ilvl)}-text">${character.average_ilvl}</td>`;
          if (columns.includes("race")) body += `<td data-filter-id="race" class="${character.faction?.toLowerCase()}-text">${character.race}</td>`;
          if (columns.includes("faction")) body += `<td data-filter-id="faction" class="${character.faction?.toLowerCase()}-text">${character.faction}</td>`;
          if (columns.includes("professionScore")) body += `<td style="color: ${colorScale((character.professions?.score || 0) / professionScores.max)}" data-filter-id="professionScore">${character.professions?.score || ""}</td>`;
          if (columns.includes("profession1"))
            body += `<td data-filter-id="profession1"
              style="color: ${colorScale(character.professions?.profession1?.level ? character.professions?.profession1?.level / character.professions?.profession1?.cap : 0)}"
              title="${character.professions?.profession1 ? "Score: " + round(character.professions?.profession1?.score, 2) + "/" + professionScores.main.value : ""}">
                ${character.professions?.profession1 ? `${character.professions?.profession1?.name} ${character.professions?.profession1?.level}/${character.professions?.profession1?.cap}` : ""}
            </td>`;
          if (columns.includes("profession2"))
            body += `<td data-filter-id="profession2"
              style="color: ${colorScale(character.professions?.profession2?.level ? character.professions?.profession2?.level / character.professions?.profession2?.cap : 0)}"
              title="${character.professions?.profession2 ? "Score: " + round(character.professions?.profession2?.score, 2) + "/" + professionScores.main.value : ""}">
                ${character.professions?.profession2 ? `${character.professions?.profession2?.name} ${character.professions?.profession2?.level}/${character.professions?.profession2?.cap}` : ""}
            </td>`;
          if (columns.includes("cooking"))
            body += `<td data-filter-id="cooking"
              style="color: ${colorScale(character.professions?.profession3?.level ? character.professions?.profession3?.level / character.professions?.profession3?.cap : 0)}"
              title="${character.professions?.profession3 ? "Score: " + round(character.professions?.profession3?.score, 2) + "/" + professionScores.cooking.value : ""}">
                ${character.professions?.profession3 ? `${character.professions?.profession3?.level}/${character.professions?.profession3?.cap}` : ""}
            </td>`;
          if (columns.includes("fishing"))
            body += `<td data-filter-id="fishing"
              style="color: ${colorScale(character.professions?.profession4?.level ? character.professions?.profession4?.level / character.professions?.profession4?.cap : 0)}"
              title="${character.professions?.profession4 ? "Score: " + round(character.professions?.profession4?.score, 2) + "/" + professionScores.fishing.value : ""}">
                ${character.professions?.profession4 ? `${character.professions?.profession4?.level}/${character.professions?.profession4?.cap}` : ""}
            </td>`;
          if (columns.includes("archaeology"))
            body += `<td data-filter-id="archaeology"
              style="color: ${colorScale(character.professions?.profession5?.level ? character.professions?.profession5?.level / character.professions?.profession5?.cap : 0)}"
              title="${character.professions?.profession5 ? "Score: " + round(character.professions?.profession5?.score, 2) + "/" + professionScores.archaeology.value : ""}">
                ${character.professions?.profession5 ? `${character.professions?.profession5?.level}/${character.professions?.profession5?.cap}` : ""}
            </td>`;
          if (columns.includes("lastOnline")) body += `<td data-filter-id="lastOnline">${convertTime(new Date().getTime() - new Date(character.last_login).getTime())}</td>`;
          if (columns.includes("playtime")) body += `<td data-filter-id="playtime">${character.played ? convertTime(character.played, "minutes") : ""}</td>`;
          if (columns.includes("notes")) body += `<td data-filter-id="notes">${character.notes || ""}</td>`;
        } else {
          let spread = getTableWidth();
          ["index", "icon", "name", "server", "region", "playtime", "notes"].forEach((item, i) => {
            if (columns.includes(item)) spread--;
          });

          body += `<tr data-char-id="${characterId}" class="missing"><td><img src="assets/dots.svg" alt="dots" /></td>`;
          if (columns.includes("index")) body += `<td data-filter-id="index">${index}</td>`;
          if (columns.includes("icon")) body += `<td data-filter-id="icon"><img src="assets/unknown.png" alt="icon" /></td>`;
          if (columns.includes("name")) body += `<td data-filter-id="name">${character.name}</td>`;
          if (columns.includes("server")) body += `<td data-filter-id="server">${character.server}</td>`;
          if (columns.includes("region")) body += `<td data-filter-id="region">${character.region}</td>`;
          body += `<td colspan="${spread}">Character not found</td>`;
          if (columns.includes("playtime")) body += `<td data-filter-id="playtime">${character.played ? convertTime(character.played, "minutes") : ""}</td>`;
          if (columns.includes("notes")) body += `<td data-filter-id="notes">${character.notes || ""}</td>`;
        }
      });
      body += "</tr>";
      table.innerHTML += body;
      break;

    case "class_stats":
      let classData = {
        paladin: {name: "Paladin"},
        deathKnight: {name: "Death Knight"},
        druid: {name: "Druid"},
        rogue: {name: "Rogue"},
        hunter: {name: "Hunter"},
        monk: {name: "Monk"},
        evoker: {name: "Evoker"},
        mage: {name: "Mage"},
        shaman: {name: "Shaman"},
        demonHunter: {name: "Demon Hunter"},
        warlock: {name: "Warlock"},
        priest: {name: "Priest"},
        warrior: {name: "Warrior"},
      };
      for (let classs in classData) classData[classs] = {...classData[classs], count: 0, allianceCount: 0, hordeCount: 0, highestLevel: 0, highestAllianceLevel: 0, highestHordeLevel: 0, maxCount: 0, maxAllianceCount: 0, maxHordeCount: 0};
      maxes = {count: 0, allianceCount: 0, hordeCount: 0, maxCount: 0, maxAllianceCount: 0, maxHordeCount: 0};

      characters.forEach((characterId, i) => {
        let character = characterData[characterId];
        let {faction, level} = character;
        if (character.class) {
          let classs = toCamelCase(character.class);

          if (level > 10) {
            classData[classs].count++;
            if (faction == "Alliance") classData[classs].allianceCount++;
            if (faction == "Horde") classData[classs].hordeCount++;
          }

          if (level > classData[classs].highestLevel) classData[classs].highestLevel = level;
          if (level > classData[classs].highestAllianceLevel && faction == "Alliance") classData[classs].highestAllianceLevel = level;
          if (level > classData[classs].highestHordeLevel && faction == "Horde") classData[classs].highestHordeLevel = level;

          if (level == maxLevel) {
            classData[classs].maxCount++;
            if (faction == "Alliance") classData[classs].maxAllianceCount++;
            if (faction == "Horde") classData[classs].maxHordeCount++;
          }
        }
      });

      Object.keys(classData).forEach((classId, i) => {
        if (classData[classId].count > maxes.count) maxes.count = classData[classId].count;
        if (classData[classId].allianceCount > maxes.allianceCount) maxes.allianceCount = classData[classId].allianceCount;
        if (classData[classId].hordeCount > maxes.hordeCount) maxes.hordeCount = classData[classId].hordeCount;
        if (classData[classId].maxCount > maxes.maxCount) maxes.maxCount = classData[classId].maxCount;
        if (classData[classId].maxAllianceCount > maxes.maxAllianceCount) maxes.maxAllianceCount = classData[classId].maxAllianceCount;
        if (classData[classId].maxHordeCount > maxes.maxHordeCount) maxes.maxHordeCount = classData[classId].maxHordeCount;
      });

      // console.log(Object.keys(classData));
      Object.keys(classData).forEach((classId, i) => {
        if (classData[classId].count > 0 || columns.includes("showUnused")) {
          body += `<tr data-class-id="${classId}"><td></td>`;
          if (columns.includes("className")) body += `<td data-filter-id="name" class="${classId}-text">${classData[classId].name}</td>`;
          if (columns.includes("count")) body += `<td data-filter-id="count" style="color:${colorScale(classData[classId].count / maxes.count)}">${classData[classId].count}</td>`;
          if (columns.includes("allianceCount")) body += `<td data-filter-id="allianceCount" class="alliance-bg" style="color:${colorScale(classData[classId].allianceCount / maxes.allianceCount)}">${classData[classId].allianceCount}</td>`;
          if (columns.includes("hordeCount")) body += `<td data-filter-id="hordeCount" class="horde-bg" style="color:${colorScale(classData[classId].hordeCount / maxes.hordeCount)}">${classData[classId].hordeCount}</td>`;
          if (columns.includes("highestLevel")) body += `<td data-filter-id="highestLevel" style="color:${colorScale(classData[classId].highestLevel / maxLevel)}">${classData[classId].highestLevel}</td>`;
          if (columns.includes("highestAllianceLevel"))
            body += `<td data-filter-id="highestAllianceLevel" class="alliance-bg" style="color:${colorScale(classData[classId].highestAllianceLevel / maxLevel)}">${classData[classId].highestAllianceLevel}</td>`;
          if (columns.includes("highestHordeLevel"))
            body += `<td data-filter-id="highestHordeLevel" class="horde-bg" style="color:${colorScale(classData[classId].highestHordeLevel / maxLevel)}">${classData[classId].highestHordeLevel}</td>`;
          if (columns.includes("maxCount")) body += `<td data-filter-id="maxCount" style="color:${colorScale(classData[classId].maxCount / maxes.maxCount)}">${classData[classId].maxCount}</td>`;
          if (columns.includes("maxAllianceCount"))
            body += `<td data-filter-id="maxAllianceCount" class="alliance-bg" style="color:${colorScale(classData[classId].maxAllianceCount / maxes.maxAllianceCount)}">${classData[classId].maxAllianceCount}</td>`;
          if (columns.includes("maxHordeCount")) body += `<td data-filter-id="maxHordeCount" class="horde-bg" style="color:${colorScale(classData[classId].maxHordeCount / maxes.maxHordeCount)}">${classData[classId].maxHordeCount}</td>`;
          body += "</tr>";
        }
      });
      table.innerHTML += body;
      break;

    case "race_stats":
      let race_data = {
        dwarf: {name: "Dwarf", faction: "alliance", count: 0, highestLevel: 0, maxCount: 0},
        gnome: {name: "Gnome", faction: "alliance", count: 0, highestLevel: 0, maxCount: 0},
        human: {name: "Human", faction: "alliance", count: 0, highestLevel: 0, maxCount: 0},
        nightElf: {name: "Night Elf", faction: "alliance", count: 0, highestLevel: 0, maxCount: 0},
        draenei: {name: "Draenei", faction: "alliance", count: 0, highestLevel: 0, maxCount: 0},
        worgen: {name: "Worgen", faction: "alliance", count: 0, highestLevel: 0, maxCount: 0},
        lightforgedDraenei: {name: "Lightforged Draenei", faction: "alliance", count: 0, highestLevel: 0, maxCount: 0},
        voidElf: {name: "Void Elf", faction: "alliance", count: 0, highestLevel: 0, maxCount: 0},
        darkIronDwarf: {name: "Dark Iron Dwarf", faction: "alliance", count: 0, highestLevel: 0, maxCount: 0},
        mechagnome: {name: "Mechagnome", faction: "alliance", count: 0, highestLevel: 0, maxCount: 0},
        kulTiran: {name: "Kul Tiran", faction: "alliance", count: 0, highestLevel: 0, maxCount: 0},

        pandaren: {name: "Pandaren", faction: "neutral", count: 0, highestLevel: 0, maxCount: 0},
        dracthyr: {name: "Dracthyr", faction: "neutral", count: 0, highestLevel: 0, maxCount: 0},
        earthen: {name: "Earthen", faction: "neutral", count: 0, highestLevel: 0, maxCount: 0},

        orc: {name: "Orc", faction: "horde", count: 0, highestLevel: 0, maxCount: 0},
        tauren: {name: "Tauren", faction: "horde", count: 0, highestLevel: 0, maxCount: 0},
        troll: {name: "Troll", faction: "horde", count: 0, highestLevel: 0, maxCount: 0},
        undead: {name: "Undead", faction: "horde", count: 0, highestLevel: 0, maxCount: 0},
        bloodElf: {name: "Blood Elf", faction: "horde", count: 0, highestLevel: 0, maxCount: 0},
        goblin: {name: "Goblin", faction: "horde", count: 0, highestLevel: 0, maxCount: 0},
        highmountainTauren: {name: "Highmountain Tauren", faction: "horde", count: 0, highestLevel: 0, maxCount: 0},
        nightborne: {name: "Nightborne", faction: "horde", count: 0, highestLevel: 0, maxCount: 0},
        magHarOrc: {name: "Mag'har Orc", faction: "horde", count: 0, highestLevel: 0, maxCount: 0},
        vulpera: {name: "Vulpera", faction: "horde", count: 0, highestLevel: 0, maxCount: 0},
        zandalariTroll: {name: "Zandalari Troll", faction: "horde", count: 0, highestLevel: 0, maxCount: 0},
      };
      maxes = {count: 0, maxCount: 0};

      characters.forEach((characterId, i) => {
        let character = characterData[characterId];
        let {level} = character;
        if (character.race) {
          let race = toCamelCase(character.race);
          // console.log(race);

          if (level > 10) race_data[race].count++;
          if (level > race_data[race].highestLevel) race_data[race].highestLevel = level;
          if (level == maxLevel) {
            race_data[race].maxCount++;
          }
        }
      });

      Object.keys(race_data).forEach((race_id, i) => {
        if (race_data[race_id].count > maxes.count) maxes.count = race_data[race_id].count;
        if (race_data[race_id].maxCount > maxes.maxCount) maxes.maxCount = race_data[race_id].maxCount;
      });

      // console.log(Object.keys(race_data));
      Object.keys(race_data).forEach((race_id, i) => {
        // console.log(race_id);
        if (race_data[race_id].count > 0 || columns.includes("showUnused")) {
          body += `<tr data-race-id="${race_id}"><td></td>`;
          if (columns.includes("raceName")) body += `<td data-filter-id="name" class="${race_data[race_id].faction}-text" race="${race_id}-text">${race_data[race_id].name}</td>`;
          if (columns.includes("count")) body += `<td data-filter-id="count" style="color:${colorScale(race_data[race_id].count / maxes.count)}">${race_data[race_id].count}</td>`;
          if (columns.includes("highestLevel")) body += `<td data-filter-id="highestLevel" style="color:${colorScale(race_data[race_id].highestLevel / maxLevel)}">${race_data[race_id].highestLevel}</td>`;
          if (columns.includes("maxCount")) body += `<td data-filter-id="maxCount" style="color:${colorScale(race_data[race_id].maxCount / maxes.maxCount)}">${race_data[race_id].maxCount}</td>`;
          body += "</tr>";
        }
      });
      table.innerHTML += body;
      break;

    case "gear":
      characters.forEach((characterId, i) => {
        let character = characterData[characterId];

        if (!character.failed) {
          body += `<tr data-char-id="${characterId}"><td><img src="assets/dots.svg" alt="dots" /></td>`;
          if (columns.includes("index")) body += `<td data-filter-id="index">${index}</td>`;
          if (columns.includes("icon")) body += `<td><img src="${character.media?.avatar || "assets/unknown.png"}" alt="icon" /></td>`;
          if (columns.includes("name")) body += `<td data-filter-id="name" class="${fixClass(character.class?.toLowerCase()) + "-text"}">${character.name}</td>`;
          if (columns.includes("server")) body += `<td data-filter-id="server">${character.server}</td>`;
          if (columns.includes("region")) body += `<td data-filter-id="region">${character.region}</td>`;
          if (columns.includes("lvl")) body += `<td data-filter-id="lvl">${character.level}</td>`;
          if (columns.includes("ilvl")) body += `<td data-filter-id="ilvl" class="${getGearRarity(character.average_ilvl)}-text">${character.average_ilvl}</td>`;
          if (columns.includes("tierCount")) body += `<td data-filter-id="tierCount" style="color:${colorScale((character.gear?.tier || 0) / 5)}">${character.gear?.tier || 0}/5</td>`;
          if (columns.includes("craftedUnique")) body += `<td data-filter-id="craftedUnique" style="color:${colorScale((character.gear?.craftedUnique || 0) / 2)}">${character.gear?.craftedUnique || 0}/2</td>`;
          if (columns.includes("uniqueGem")) body += `<td data-filter-id="uniqueGem" style="color:${colorScale(character.gear?.uniqueGem ? 1 : 0)}">${displayBoolean(character.gear?.uniqueGem)}</td>`;

          // Individual Item Level
          if (columns.includes("pieceIlvl")) {
            let slots = ["head", "neck", "shoulders", "back", "chest", "waist", "legs", "feet", "wrist", "hands", "ring_1", "ring_2", "trinket_1", "trinket_2", "main_hand", "off_hand"];
            slots.forEach((slot, i) => {
              body += `<td data-filter-id="${slot}_ilvl" class="${getGearRarity(character.gear?.[slot]?.ilvl)}-text">`;
              body += character.gear?.[slot]?.ilvl || "";
              body += character.gear?.[slot]?.tier ? '<span class="tier" title="Tier piece"> T</span>' : "";
              body += character.gear?.[slot]?.rarity == "Artifact" ? '<span class="artifact-text" title="Artifact"> A</span>' : "";
              body += character.gear?.[slot]?.rarity == "Legendary" ? '<span class="legendary-text" title="Legendary"> L</span>' : "";
              body += "</td>";
            });
          }

          // Sockets
          if (columns.includes("sockets")) {
            let slots = ["head", "neck", "waist", "wrist", "ring_1", "ring_2"];

            slots.forEach((slot, i) => {
              body += `<td data-filter-id="${slot}_socket"${!character.gear?.[slot]?.sockets?.[0] ? ` style="color:${colorScale(0)}"` : ""}>`;
              if (character.gear?.[slot]?.sockets) body += fixWowString(character.gear[slot].sockets[0] || "Missing");
              body += "</td>";
              if (slot == "neck") {
                body += `<td data-filter-id="${slot}_socket"${!character.gear?.[slot]?.sockets?.[1] ? ` style="color:${colorScale(0)}"` : ""}>`;
                if (character.gear?.[slot]?.sockets) body += fixWowString(character.gear[slot].sockets[1] || "Missing");
                body += "</td>";
                body += `<td data-filter-id="${slot}_socket"${!character.gear?.[slot]?.sockets?.[2] ? ` style="color:${colorScale(0)}"` : ""}>`;
                if (character.gear?.[slot]?.sockets) body += fixWowString(character.gear[slot].sockets[2] || "Missing");
                body += "</td>";
              }
            });
          }

          // Enchants
          if (columns.includes("enchants")) {
            let slots = ["head", "back", "chest", "wrist", "legs", "feet", "ring_1", "ring_2", "main_hand", "off_hand"];
            slots.forEach((slot, i) => {
              body += `<td data-filter-id="${slot}_enchant" style="color:${cratingQualityColor(character.gear?.[slot]?.enchant)}">`;
              body += character.gear?.[slot] ? character.gear[slot].enchant?.replace(/[☆⭐]/g, "") || "Missing" : "";
              body += "</td>";
            });
          }

          if (columns.includes("health")) body += `<td data-filter-id="health">${character.stats?.health?.toLocaleString()}</td>`;

          // Main Stats
          if (columns.includes("mainStats")) {
            let stats = ["agility", "intellect", "strength"];
            let max_stat = Math.max(...stats.map((stat) => character.stats?.[stat]));
            stats.forEach((stat, i) => {
              body += `<td data-filter-id="${stat}"${character.stats?.[stat] == max_stat ? "" : ' class="inactive"'}>`;
              body += character.stats?.[stat];
              body += "</td>";
            });
          }

          // Secondary Stats
          if (columns.includes("secondaryStats")) {
            let stats = ["crit", "haste", "mastery", "versatility"];
            let max_stat = Math.max(...stats.map((stat) => character.stats?.[stat]));
            stats.forEach((stat, i) => {
              body += `<td data-filter-id="${stat}">`;
              body += character.stats?.[stat] || "";
              body += "</td>";
            });
          }

          // Tertiary Stats
          if (columns.includes("tertiaryStats")) {
            let stats = ["avoidance", "lifesteal", "speed"];
            let max_stat = Math.max(...stats.map((stat) => character.stats?.[stat]));
            stats.forEach((stat, i) => {
              body += `<td data-filter-id="${stat}">`;
              body += character.stats?.[stat] || "";
              body += "</td>";
            });
          }

          if (columns.includes("playtime")) body += `<td data-filter-id="playtime">${character.played ? convertTime(character.played, "minutes") : ""}</td>`;
          if (columns.includes("notes")) body += `<td data-filter-id="notes">${character.notes || ""}</td>`;
        } else {
          let spread = getTableWidth();
          ["index", "icon", "name", "server", "region", "playtime", "notes"].forEach((item, i) => {
            if (columns.includes(item)) spread--;
          });

          body += `<tr data-char-id="${characterId}" class="missing"><td><img src="assets/dots.svg" alt="dots" /></td>`;
          if (columns.includes("index")) body += `<td data-filter-id="index">${index}</td>`;
          if (columns.includes("icon")) body += `<td data-filter-id="icon"><img src="assets/unknown.png" alt="icon" /></td>`;
          if (columns.includes("name")) body += `<td data-filter-id="name">${character.name}</td>`;
          if (columns.includes("server")) body += `<td data-filter-id="server">${character.server}</td>`;
          if (columns.includes("region")) body += `<td data-filter-id="region">${character.region}</td>`;
          body += `<td colspan="${spread}">Character not found</td>`;
          if (columns.includes("playtime")) body += `<td data-filter-id="playtime">${character.played ? convertTime(character.played, "minutes") : ""}</td>`;
          if (columns.includes("notes")) body += `<td data-filter-id="notes">${character.notes || ""}</td>`;
        }
      });
      body += "</tr>";
      table.innerHTML += body;
      break;

    default:
  }

  if (!/class_stats|race_stats/.test(activePage)) {
    // Sort the table
    body = [...document.querySelectorAll("tr:not(:has(th))")];
    for (let i = sorts.length - 1; i >= 0; i--) {
      body.sort((a, b) => {
        let val1 = parseIf(a.querySelector(`[data-filter-id="${sorts[i]}"]`)?.innerText || 0);
        let val2 = parseIf(b.querySelector(`[data-filter-id="${sorts[i]}"]`)?.innerText || 0);
        if (val1 < val2) return 1;
        if (val1 > val2) return -1;
        return 0;
      });
    }

    // Place the sorted rows into the table
    body.forEach((row, i) => {
      let indexEle = row.querySelector('[data-filter-id="index"]');
      if (indexEle) indexEle.innerText = i + 1;
      table.append(row);
    });
  }

  // Add an event to the button to show the filters popup
  document.querySelector("tr:has(th) > td:has(img)")?.addEventListener("click", () => {
    document.querySelector(".editPopup")?.classList?.toggle("active");
  });

  // Open the add character dialog
  document.querySelectorAll('tr:not(:has(th)) td:has(img[alt="dots"])').forEach((element, i) => {
    element.addEventListener("click", (event) => {
      let char_id = element.parentElement.dataset.charId;
      let {name, server, region, played, notes} = characterInputData[char_id];
      let days = Math.floor(played / (60 * 24));
      let hours = Math.floor((played % (60 * 24)) / 60);
      let minutes = played % 60;

      document.querySelector("#characterEdit .error").innerText = "";
      document.querySelector("#characterEdit [name='prev-name']").value = name;
      document.querySelector("#characterEdit [name='prev-realm']").value = server;
      document.querySelector("#characterEdit [name='prev-realm']").setAttribute("list", region.toLowerCase() + "-servers");
      document.querySelector("#characterEdit [name='prev-region']").value = region;
      document.querySelector("#characterEdit [name='name']").value = name;
      document.querySelector("#characterEdit [name='realm']").value = server;
      document.querySelector("#characterEdit [name='region']").value = region;
      document.querySelector("#characterEdit [name='days']").value = days || "";
      document.querySelector("#characterEdit [name='hours']").value = hours || "";
      document.querySelector("#characterEdit [name='minutes']").value = minutes || "";
      document.querySelector("#characterEdit textarea[name='notes']").value = notes || "";
      document.querySelectorAll(".invalid").forEach((element2, i) => {
        element2.classList.remove("invalid");
      });

      activateDialog("characterEdit");
    });
  });

  function fixClass(classs) {
    if (classs == "death knight") return "deathKnight";
    if (classs == "demon hunter") return "demonHunter";
    return classs;
  }
}

// Close all dialog boxes
function closeDialog() {
  let openDialogs = document.querySelectorAll("dialog[open], dialog.active");
  for (let dialog of openDialogs) {
    dialog.classList.remove("active");
    dialog.classList.add("delete-me");
    setTimeout(() => {
      document.querySelectorAll(".delete-me").forEach((openDialog) => {
        openDialog.open = false;
        openDialog.classList.remove("delete-me");
      });
    }, time.second(1));
  }
}

// Opens a dialog box
function activateDialog(id) {
  closeDialog();
  let dialog = document.querySelector("dialog#" + id);
  dialog.open = true;
  setTimeout(() => {
    dialog.classList.add("active");
    dialog.classList.remove("delete-me");
  }, time.second(0.01));
}

// Fetches all the data for all of the characters
function populateData() {
  if (Object.keys(characterInputData).length > 0) {
    document.querySelector("#loading")?.classList?.add("active");
    let i = 1;
    let character_input_ids = Object.keys(characterInputData);
    // character_input_ids.sort((a, b) => (characterData[a]?.last_login || 0) < (characterData[b]?.last_login || 0));

    let startTime = performance.now();

    for (let j = 0; j < character_input_ids.length; j++) {
      let input_character = characterInputData[character_input_ids[j]];
      let {name, server, region, played, notes} = input_character;

      populateCharacter(name, server, region, played, notes, false).then((result) => {
        if (i != character_input_ids.length) {
          document.querySelector("#loading")?.classList?.add("active");
          i++;
        } else {
          let endTime = performance.now();
          let completetion_time = round((endTime - startTime) / 1000, 3);
          console.log(`All done fetching data, ${character_input_ids.length} characters took ${completetion_time} seconds to fetch.`);
          buildTable();
          setCookie("character-data", characterData);
          document.querySelector("#loading")?.classList?.remove("active");
        }
      });
    }
  }
}

let forceUpdate = false;
// Fetches all the data for character
async function populateCharacter(name, server, region, played, notes, update_table = true) {
  if (!update_table) document.querySelector("#loading")?.classList?.add("active");
  let charId = getCharId(name, server, region);
  if (notes === undefined) notes = characterInputData[charId]?.notes || "";
  if (played === undefined) played = characterInputData[charId]?.played || "";
  characterData[charId] = {...characterData[charId], name, server, region, played, notes};
  let {last_login} = characterData[charId];
  let output = await getCharacterData(name, server, region)
    .then(async (result) => {
      characterData[charId] = {...characterData[charId], ...result, failed: false};
      if (result.last_login != last_login || forceUpdate) {
        return await getCharacterStats(name, server, region).then(async (result) => {
          characterData[charId].stats = result;
          return await getCharacterProfessions(name, server, region).then(async (result) => {
            characterData[charId].professions = result;
            return await getCharacterGear(name, server, region).then(async (result) => {
              characterData[charId].gear = result;
              return await getCharacterRaids(name, server, region).then(async (result) => {
                characterData[charId].raid_progress = result;
                return await getCharacterMythics(name, server, region).then(async (result) => {
                  characterData[charId].mythic_plus = result;
                  return await getCharacterMedia(name, server, region)
                    .then((result) => {
                      characterData[charId].media = result;
                      setCookie("character-data", characterData);
                      return characterData[charId];
                    })
                    .catch((error) => {
                      if (reportFetches) console.warn(error);
                      return characterData[charId];
                    });
                });
              });
            });
          });
        });
      } else return characterData[charId];
    })
    .catch((error) => {
      if (!characterData[charId].last_login) characterData[charId] = {failed: true, ...characterData[charId]};
      if (reportFetches) console.warn(error);
      return characterData[charId];
    });

  if (update_table) buildTable();
  else document.querySelector("#loading")?.classList?.remove("active");

  return output;
}

// Finds what server is the most popular for the given tab
function getPopularServer(tab = activeTab) {
  let {characters} = tabDetails[activeTab];
  let results = {};

  for (let characterId of characters) {
    let character_info = characterData[characterId];
    let server_id = `${character_info.server}|${character_info.region}`;
    results[server_id] = (results[server_id] || 0) + 1;
  }

  let maxKey = null;
  let maxValue = 0;

  for (let key in results) {
    if (results[key] > maxValue) {
      maxValue = results[key];
      maxKey = key;
    }
  }
  return maxKey?.split("|") || ["", "US"];
}
