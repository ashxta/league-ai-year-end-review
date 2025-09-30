import { NextRequest, NextResponse } from "next/server";

// Mock champion data for realistic responses
const CHAMPIONS = [
  { id: 103, name: "Ahri", role: "Mage" },
  { id: 84, name: "Akali", role: "Assassin" },
  { id: 12, name: "Alistar", role: "Support" },
  { id: 32, name: "Amumu", role: "Tank" },
  { id: 34, name: "Anivia", role: "Mage" },
  { id: 1, name: "Annie", role: "Mage" },
  { id: 22, name: "Ashe", role: "Marksman" },
  { id: 136, name: "Aurelion Sol", role: "Mage" },
  { id: 268, name: "Azir", role: "Mage" },
  { id: 432, name: "Bard", role: "Support" },
  { id: 53, name: "Blitzcrank", role: "Support" },
  { id: 63, name: "Brand", role: "Mage" },
  { id: 201, name: "Braum", role: "Support" },
  { id: 51, name: "Caitlyn", role: "Marksman" },
  { id: 164, name: "Camille", role: "Fighter" },
  { id: 69, name: "Cassiopeia", role: "Mage" },
  { id: 31, name: "Cho'Gath", role: "Tank" },
  { id: 42, name: "Corki", role: "Marksman" },
  { id: 122, name: "Darius", role: "Fighter" },
  { id: 131, name: "Diana", role: "Fighter" },
  { id: 119, name: "Draven", role: "Marksman" },
  { id: 36, name: "Dr. Mundo", role: "Tank" },
  { id: 245, name: "Ekko", role: "Assassin" },
  { id: 60, name: "Elise", role: "Mage" },
  { id: 28, name: "Evelynn", role: "Assassin" },
  { id: 81, name: "Ezreal", role: "Marksman" },
  { id: 9, name: "Fiddlesticks", role: "Mage" },
  { id: 114, name: "Fiora", role: "Fighter" },
  { id: 105, name: "Fizz", role: "Assassin" },
  { id: 3, name: "Galio", role: "Tank" },
  { id: 41, name: "Gangplank", role: "Fighter" },
  { id: 86, name: "Garen", role: "Fighter" },
  { id: 150, name: "Gnar", role: "Fighter" },
  { id: 79, name: "Gragas", role: "Fighter" },
  { id: 104, name: "Graves", role: "Marksman" },
  { id: 887, name: "Gwen", role: "Fighter" },
  { id: 120, name: "Hecarim", role: "Fighter" },
  { id: 74, name: "Heimerdinger", role: "Mage" },
  { id: 420, name: "Illaoi", role: "Fighter" },
  { id: 39, name: "Irelia", role: "Fighter" },
  { id: 427, name: "Ivern", role: "Support" },
  { id: 40, name: "Janna", role: "Support" },
  { id: 59, name: "Jarvan IV", role: "Fighter" },
  { id: 24, name: "Jax", role: "Fighter" },
  { id: 126, name: "Jayce", role: "Fighter" },
  { id: 202, name: "Jhin", role: "Marksman" },
  { id: 222, name: "Jinx", role: "Marksman" },
  { id: 145, name: "Kai'Sa", role: "Marksman" },
  { id: 429, name: "Kalista", role: "Marksman" },
  { id: 43, name: "Karma", role: "Mage" },
  { id: 30, name: "Karthus", role: "Mage" },
  { id: 38, name: "Kassadin", role: "Assassin" },
  { id: 55, name: "Katarina", role: "Assassin" },
  { id: 10, name: "Kayle", role: "Fighter" },
  { id: 141, name: "Kayn", role: "Fighter" },
  { id: 85, name: "Kennen", role: "Mage" },
  { id: 121, name: "Kha'Zix", role: "Assassin" },
  { id: 203, name: "Kindred", role: "Marksman" },
  { id: 240, name: "Kled", role: "Fighter" },
  { id: 96, name: "Kog'Maw", role: "Marksman" },
  { id: 7, name: "LeBlanc", role: "Assassin" },
  { id: 64, name: "Lee Sin", role: "Fighter" },
  { id: 89, name: "Leona", role: "Tank" },
  { id: 876, name: "Lillia", role: "Fighter" },
  { id: 127, name: "Lissandra", role: "Mage" },
  { id: 236, name: "Lucian", role: "Marksman" },
  { id: 117, name: "Lulu", role: "Support" },
  { id: 99, name: "Lux", role: "Mage" },
  { id: 54, name: "Malphite", role: "Tank" },
  { id: 90, name: "Malzahar", role: "Mage" },
  { id: 57, name: "Maokai", role: "Tank" },
  { id: 11, name: "Master Yi", role: "Assassin" },
  { id: 21, name: "Miss Fortune", role: "Marksman" },
  { id: 62, name: "Wukong", role: "Fighter" },
  { id: 82, name: "Mordekaiser", role: "Fighter" },
  { id: 25, name: "Morgana", role: "Mage" },
  { id: 267, name: "Nami", role: "Support" },
  { id: 75, name: "Nasus", role: "Fighter" },
  { id: 111, name: "Nautilus", role: "Tank" },
  { id: 518, name: "Neeko", role: "Mage" },
  { id: 76, name: "Nidalee", role: "Assassin" },
  { id: 56, name: "Nocturne", role: "Assassin" },
  { id: 20, name: "Nunu & Willump", role: "Tank" },
  { id: 2, name: "Olaf", role: "Fighter" },
  { id: 61, name: "Orianna", role: "Mage" },
  { id: 516, name: "Ornn", role: "Tank" },
  { id: 80, name: "Pantheon", role: "Fighter" },
  { id: 78, name: "Poppy", role: "Tank" },
  { id: 555, name: "Pyke", role: "Support" },
  { id: 246, name: "Qiyana", role: "Assassin" },
  { id: 133, name: "Quinn", role: "Marksman" },
  { id: 497, name: "Rakan", role: "Support" },
  { id: 33, name: "Rammus", role: "Tank" },
  { id: 421, name: "Rek'Sai", role: "Fighter" },
  { id: 526, name: "Rell", role: "Tank" },
  { id: 58, name: "Renekton", role: "Fighter" },
  { id: 107, name: "Rengar", role: "Assassin" },
  { id: 92, name: "Riven", role: "Fighter" },
  { id: 68, name: "Rumble", role: "Fighter" },
  { id: 13, name: "Ryze", role: "Mage" },
  { id: 360, name: "Samira", role: "Marksman" },
  { id: 113, name: "Sejuani", role: "Tank" },
  { id: 235, name: "Senna", role: "Marksman" },
  { id: 147, name: "Seraphine", role: "Mage" },
  { id: 875, name: "Sett", role: "Fighter" },
  { id: 35, name: "Shaco", role: "Assassin" },
  { id: 98, name: "Shen", role: "Tank" },
  { id: 102, name: "Shyvana", role: "Fighter" },
  { id: 27, name: "Singed", role: "Tank" },
  { id: 14, name: "Sion", role: "Tank" },
  { id: 15, name: "Sivir", role: "Marksman" },
  { id: 72, name: "Skarner", role: "Fighter" },
  { id: 37, name: "Sona", role: "Support" },
  { id: 16, name: "Soraka", role: "Support" },
  { id: 50, name: "Swain", role: "Mage" },
  { id: 517, name: "Sylas", role: "Mage" },
  { id: 134, name: "Syndra", role: "Mage" },
  { id: 223, name: "Tahm Kench", role: "Support" },
  { id: 163, name: "Taliyah", role: "Mage" },
  { id: 91, name: "Talon", role: "Assassin" },
  { id: 44, name: "Taric", role: "Support" },
  { id: 17, name: "Teemo", role: "Marksman" },
  { id: 412, name: "Thresh", role: "Support" },
  { id: 18, name: "Tristana", role: "Marksman" },
  { id: 48, name: "Trundle", role: "Fighter" },
  { id: 23, name: "Tryndamere", role: "Fighter" },
  { id: 4, name: "Twisted Fate", role: "Mage" },
  { id: 29, name: "Twitch", role: "Marksman" },
  { id: 77, name: "Udyr", role: "Fighter" },
  { id: 6, name: "Urgot", role: "Fighter" },
  { id: 110, name: "Varus", role: "Marksman" },
  { id: 67, name: "Vayne", role: "Marksman" },
  { id: 45, name: "Veigar", role: "Mage" },
  { id: 161, name: "Vel'Koz", role: "Mage" },
  { id: 711, name: "Vex", role: "Mage" },
  { id: 254, name: "Vi", role: "Fighter" },
  { id: 234, name: "Viego", role: "Assassin" },
  { id: 112, name: "Viktor", role: "Mage" },
  { id: 8, name: "Vladimir", role: "Mage" },
  { id: 106, name: "Volibear", role: "Fighter" },
  { id: 19, name: "Warwick", role: "Fighter" },
  { id: 498, name: "Xayah", role: "Marksman" },
  { id: 101, name: "Xerath", role: "Mage" },
  { id: 5, name: "Xin Zhao", role: "Fighter" },
  { id: 157, name: "Yasuo", role: "Fighter" },
  { id: 777, name: "Yone", role: "Assassin" },
  { id: 83, name: "Yorick", role: "Fighter" },
  { id: 350, name: "Yuumi", role: "Support" },
  { id: 154, name: "Zac", role: "Tank" },
  { id: 238, name: "Zed", role: "Assassin" },
  { id: 221, name: "Zeri", role: "Marksman" },
  { id: 115, name: "Ziggs", role: "Mage" },
  { id: 26, name: "Zilean", role: "Support" },
  { id: 142, name: "Zoe", role: "Mage" },
  { id: 143, name: "Zyra", role: "Support" },
];

// Generate realistic mock match data
function generateMockMatches(summonerName: string) {
  const numMatches = 150 + Math.floor(Math.random() * 100); // 150-250 matches
  const matches = [];
  
  // Pick 3-5 favorite champions
  const favoriteChamps = CHAMPIONS.sort(() => Math.random() - 0.5).slice(0, 3 + Math.floor(Math.random() * 3));
  
  for (let i = 0; i < numMatches; i++) {
    // 60% chance to pick from favorites
    const champion = Math.random() < 0.6 
      ? favoriteChamps[Math.floor(Math.random() * favoriteChamps.length)]
      : CHAMPIONS[Math.floor(Math.random() * CHAMPIONS.length)];
    
    const win = Math.random() < 0.52; // Slightly positive win rate
    const kills = Math.floor(Math.random() * 15) + 1;
    const deaths = Math.floor(Math.random() * 8) + 1;
    const assists = Math.floor(Math.random() * 12) + 2;
    const gameDuration = 1200 + Math.floor(Math.random() * 1200); // 20-40 min
    const cs = Math.floor((gameDuration / 60) * (4 + Math.random() * 3)); // 4-7 CS/min
    
    matches.push({
      matchId: `NA1_${4500000000 + i}`,
      championId: champion.id,
      championName: champion.name,
      role: champion.role,
      win,
      kills,
      deaths,
      assists,
      cs,
      gold: Math.floor(10000 + Math.random() * 8000),
      damage: Math.floor(15000 + Math.random() * 25000),
      gameDuration,
      timestamp: Date.now() - (i * 86400000 * (365 / numMatches)), // Spread across year
      queue: Math.random() < 0.7 ? "RANKED_SOLO_5x5" : "NORMAL_DRAFT_5x5",
    });
  }
  
  return matches;
}

// Calculate statistics from matches
function calculateStats(matches: any[]) {
  const totalGames = matches.length;
  const wins = matches.filter(m => m.win).length;
  const losses = totalGames - wins;
  const winRate = (wins / totalGames) * 100;
  
  const totalKills = matches.reduce((sum, m) => sum + m.kills, 0);
  const totalDeaths = matches.reduce((sum, m) => sum + m.deaths, 0);
  const totalAssists = matches.reduce((sum, m) => sum + m.assists, 0);
  const avgKills = totalKills / totalGames;
  const avgDeaths = totalDeaths / totalGames;
  const avgAssists = totalAssists / totalGames;
  const kda = totalDeaths > 0 ? (totalKills + totalAssists) / totalDeaths : totalKills + totalAssists;
  
  const totalCs = matches.reduce((sum, m) => sum + m.cs, 0);
  const totalDuration = matches.reduce((sum, m) => sum + m.gameDuration, 0);
  const csPerMin = (totalCs / (totalDuration / 60));
  
  const totalDamage = matches.reduce((sum, m) => sum + m.damage, 0);
  const avgDamage = totalDamage / totalGames;
  
  // Champion stats
  const championStats: Record<string, any> = {};
  matches.forEach(match => {
    if (!championStats[match.championName]) {
      championStats[match.championName] = {
        name: match.championName,
        championId: match.championId,
        games: 0,
        wins: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
      };
    }
    championStats[match.championName].games++;
    if (match.win) championStats[match.championName].wins++;
    championStats[match.championName].kills += match.kills;
    championStats[match.championName].deaths += match.deaths;
    championStats[match.championName].assists += match.assists;
  });
  
  const topChampions = Object.values(championStats)
    .sort((a: any, b: any) => b.games - a.games)
    .slice(0, 5)
    .map((champ: any) => ({
      ...champ,
      winRate: (champ.wins / champ.games) * 100,
      kda: champ.deaths > 0 ? (champ.kills + champ.assists) / champ.deaths : champ.kills + champ.assists,
      avgKills: champ.kills / champ.games,
      avgDeaths: champ.deaths / champ.games,
      avgAssists: champ.assists / champ.games,
    }));
  
  // Role distribution
  const roleStats: Record<string, number> = {};
  matches.forEach(match => {
    roleStats[match.role] = (roleStats[match.role] || 0) + 1;
  });
  
  const mostPlayedRole = Object.entries(roleStats).sort((a, b) => b[1] - a[1])[0];
  
  // Pentakills (simulate rare events)
  const pentakills = matches.filter(m => m.kills >= 15 && m.win).length;
  
  // Best performance
  const bestGame = matches.reduce((best, match) => {
    const score = match.kills * 3 + match.assists * 1.5 - match.deaths * 2;
    const bestScore = best.kills * 3 + best.assists * 1.5 - best.deaths * 2;
    return score > bestScore ? match : best;
  }, matches[0]);
  
  // Comeback wins (high deaths but still won)
  const comebackWins = matches.filter(m => m.win && m.deaths >= 8).length;
  
  // Improvement over time (compare first 25% to last 25%)
  const firstQuarter = matches.slice(-Math.floor(totalGames * 0.25));
  const lastQuarter = matches.slice(0, Math.floor(totalGames * 0.25));
  
  const firstQuarterWinRate = (firstQuarter.filter(m => m.win).length / firstQuarter.length) * 100;
  const lastQuarterWinRate = (lastQuarter.filter(m => m.win).length / lastQuarter.length) * 100;
  const improvement = lastQuarterWinRate - firstQuarterWinRate;
  
  return {
    totalGames,
    wins,
    losses,
    winRate,
    kda,
    avgKills,
    avgDeaths,
    avgAssists,
    csPerMin,
    avgDamage,
    topChampions,
    mostPlayedRole: mostPlayedRole[0],
    roleDistribution: roleStats,
    pentakills,
    bestGame,
    comebackWins,
    improvement,
    totalHoursPlayed: Math.floor(totalDuration / 3600),
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const summonerName = searchParams.get("summoner");
  const region = searchParams.get("region") || "na1";

  if (!summonerName) {
    return NextResponse.json(
      { error: "Summoner name is required" },
      { status: 400 }
    );
  }

  try {
    // In a real implementation, you would:
    // 1. Call Riot API to get summoner by name
    // 2. Fetch match history for the entire year
    // 3. Get match details for each game
    
    // For demo purposes, generate mock data
    const matches = generateMockMatches(summonerName);
    const stats = calculateStats(matches);
    
    return NextResponse.json({
      summoner: {
        name: summonerName,
        region,
        level: Math.floor(Math.random() * 300) + 50,
        profileIconId: Math.floor(Math.random() * 5000),
      },
      stats,
      matches: matches.slice(0, 20), // Return most recent 20 for display
    });
  } catch (error) {
    console.error("Error fetching player data:", error);
    return NextResponse.json(
      { error: "Failed to fetch player data" },
      { status: 500 }
    );
  }
}