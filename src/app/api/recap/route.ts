import { NextRequest, NextResponse } from "next/server";

// Mock AWS Bedrock-style AI recap generation
function generateAIRecap(summonerName: string, stats: any) {
  const { 
    totalGames, 
    winRate, 
    kda, 
    topChampions, 
    mostPlayedRole,
    pentakills,
    comebackWins,
    improvement,
    totalHoursPlayed,
    avgKills,
    avgDeaths,
    avgAssists,
  } = stats;

  // Generate personalized opening
  const openings = [
    `${summonerName}, your journey on the Rift this year has been nothing short of legendary.`,
    `The Rift remembers your name, ${summonerName}. Here's your story.`,
    `${summonerName}, you've carved your legacy into the Summoner's Rift. Let's relive it.`,
    `From first blood to final nexus, ${summonerName}, this was your year.`,
  ];
  
  const opening = openings[Math.floor(Math.random() * openings.length)];

  // Generate role-specific insight
  const roleInsights: Record<string, string> = {
    Fighter: "You've mastered the art of the bruiser, diving into the fray with unmatched tenacity.",
    Tank: "Your frontline presence has been the shield your team needed time and time again.",
    Assassin: "Like a shadow in the night, you've eliminated high-value targets with surgical precision.",
    Marksman: "Your consistent damage output has turned teamfights into victories across the season.",
    Mage: "Your spell rotations have lit up the battlefield, dealing devastating AoE damage.",
    Support: "You've been the unsung hero, enabling your team's success through vision and utility.",
  };

  const roleInsight = roleInsights[mostPlayedRole] || "Your versatility across roles shows true mastery.";

  // Generate champion-specific story
  const topChamp = topChampions[0];
  const championStory = `${topChamp.name} became your signature pick with ${topChamp.games} games played. ` +
    `Your ${topChamp.winRate.toFixed(1)}% win rate and ${topChamp.kda.toFixed(2)} KDA on this champion ` +
    `proves you've truly mastered their kit.`;

  // Generate performance highlights
  const highlights = [];
  
  if (pentakills > 0) {
    highlights.push(`🏆 You achieved ${pentakills} pentakill${pentakills > 1 ? 's' : ''} this year - a feat only 0.2% of players accomplish!`);
  }
  
  if (kda >= 3.0) {
    highlights.push(`⚔️ Your ${kda.toFixed(2)} KDA places you among the elite. That's some seriously clean gameplay.`);
  }
  
  if (comebackWins > 10) {
    highlights.push(`💪 You've secured ${comebackWins} comeback victories, never giving up even when behind.`);
  }
  
  if (improvement > 5) {
    highlights.push(`📈 Your win rate improved by ${improvement.toFixed(1)}% throughout the year - you're constantly evolving!`);
  } else if (improvement < -5) {
    highlights.push(`📊 Your early season dominance set a high bar. Time to reclaim that glory!`);
  }
  
  if (totalHoursPlayed > 300) {
    highlights.push(`⏰ ${totalHoursPlayed} hours on the Rift - that's serious dedication to the grind.`);
  }

  // Generate playstyle analysis
  const kdaRatio = avgKills / Math.max(avgDeaths, 1);
  let playstyle = "";
  
  if (kdaRatio > 2 && avgKills > 8) {
    playstyle = "**Aggressive Carry**: You're not afraid to take risks, and it pays off. Your high kill participation shows you're always in the action.";
  } else if (avgDeaths < 5 && avgAssists > 8) {
    playstyle = "**Calculated Strategist**: You play smart, minimizing deaths while maximizing team contributions. Your assist numbers tell the story of a true team player.";
  } else if (avgKills > 7 && avgDeaths > 6) {
    playstyle = "**Fearless Fighter**: You live for the teamfight. High risk, high reward - that's your motto.";
  } else {
    playstyle = "**Balanced Player**: You adapt your playstyle to what your team needs, showing versatility and game knowledge.";
  }

  // Generate motivational closing
  const closings = [
    "This is just the beginning. Next year, we climb even higher.",
    "Every game, every play, every decision - they've all led to this moment. Ready for more?",
    "The Rift awaits your return. Let's make next year even more legendary.",
    "Your story continues to be written. What chapter will you create next?",
  ];
  
  const closing = closings[Math.floor(Math.random() * closings.length)];

  // Generate shareable quote
  const quotes = [
    `"In ${totalGames} games, I proved I belong on the Rift."`,
    `"${topChamp.name} main with a ${topChamp.winRate.toFixed(0)}% win rate. Respect the one-trick."`,
    `"${winRate.toFixed(0)}% win rate, ${kda.toFixed(1)} KDA. The grind never stops."`,
    `"${totalHoursPlayed} hours of pure League. No regrets."`,
  ];
  
  const shareableQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return {
    opening,
    roleInsight,
    championStory,
    highlights,
    playstyle,
    closing,
    shareableQuote,
    insights: {
      // Additional structured insights for visualization
      topMoment: `Best game: ${stats.bestGame.kills}/${stats.bestGame.deaths}/${stats.bestGame.assists} on ${stats.bestGame.championName}`,
      consistency: winRate >= 50 ? "positive" : "growth mindset",
      dedication: totalHoursPlayed > 200 ? "hardcore" : "casual",
      evolution: improvement > 0 ? "improving" : "consistent",
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { summonerName, stats } = body;

    if (!summonerName || !stats) {
      return NextResponse.json(
        { error: "Summoner name and stats are required" },
        { status: 400 }
      );
    }

    // In a real implementation, this would call AWS Bedrock
    // with a prompt template and the player's stats
    // For demo purposes, we generate a structured recap
    
    const recap = generateAIRecap(summonerName, stats);

    return NextResponse.json({ recap });
  } catch (error) {
    console.error("Error generating recap:", error);
    return NextResponse.json(
      { error: "Failed to generate recap" },
      { status: 500 }
    );
  }
}