"use client";

import { Card } from "@/components/ui/card";
import { Trophy, Target, Sparkles, TrendingUp } from "lucide-react";

interface RecapCardProps {
  type: "stats" | "champion" | "highlights" | "playstyle";
  data: any;
  className?: string;
}

export function RecapCard({ type, data, className = "" }: RecapCardProps) {
  if (type === "stats") {
    return (
      <Card className={`relative overflow-hidden bg-gradient-to-br from-card via-card to-card/50 border-2 border-primary/20 p-8 ${className}`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold">Season Overview</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-4xl font-black text-primary">{data.totalGames}</p>
              <p className="text-sm text-muted-foreground">Total Games</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl font-black text-primary">{data.winRate.toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">Win Rate</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl font-black text-primary">{data.kda.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">KDA</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl font-black text-primary">{data.totalHoursPlayed}h</p>
              <p className="text-sm text-muted-foreground">Time Played</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Most Played Role</span>
              <span className="text-lg font-bold text-primary">{data.mostPlayedRole}</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (type === "champion") {
    const topChamp = data.topChampions[0];
    return (
      <Card className={`relative overflow-hidden bg-gradient-to-br from-secondary/20 via-card to-card border-2 border-primary/20 p-8 ${className}`}>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold">Top Champion</h3>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary">
              <img 
                src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${topChamp.name.replace(/[^a-zA-Z]/g, '')}.png`}
                alt={topChamp.name}
                className="w-16 h-16 rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=100&h=100&fit=crop`;
                }}
              />
            </div>
            <div>
              <h4 className="text-3xl font-black text-primary">{topChamp.name}</h4>
              <p className="text-muted-foreground">{topChamp.games} games played</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{topChamp.winRate.toFixed(0)}%</p>
              <p className="text-xs text-muted-foreground">Win Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{topChamp.kda.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground">KDA</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{topChamp.wins}</p>
              <p className="text-xs text-muted-foreground">Wins</p>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            {topChamp.avgKills.toFixed(1)} / {topChamp.avgDeaths.toFixed(1)} / {topChamp.avgAssists.toFixed(1)} avg
          </div>
        </div>
      </Card>
    );
  }

  if (type === "highlights") {
    return (
      <Card className={`relative overflow-hidden bg-gradient-to-br from-accent/10 via-card to-card border-2 border-primary/20 p-8 ${className}`}>
        <div className="absolute top-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold">Epic Moments</h3>
          </div>
          
          <div className="space-y-4">
            {data.highlights.map((highlight: string, index: number) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">{index + 1}</span>
                </div>
                <p className="text-sm leading-relaxed">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (type === "playstyle") {
    return (
      <Card className={`relative overflow-hidden bg-gradient-to-br from-card via-secondary/5 to-card border-2 border-primary/20 p-8 ${className}`}>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold">Playstyle Analysis</h3>
          </div>
          
          <div className="mb-6 p-6 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-lg leading-relaxed">{data.playstyle}</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Average Kills</span>
              <span className="text-lg font-bold text-primary">{data.avgKills.toFixed(1)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Average Deaths</span>
              <span className="text-lg font-bold text-primary">{data.avgDeaths.toFixed(1)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Average Assists</span>
              <span className="text-lg font-bold text-primary">{data.avgAssists.toFixed(1)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">CS per Minute</span>
              <span className="text-lg font-bold text-primary">{data.csPerMin.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return null;
}