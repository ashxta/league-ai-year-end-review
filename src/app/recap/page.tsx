"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RecapCard } from "@/components/RecapCard";
import { Card } from "@/components/ui/card";
import { Download, Share2, ArrowLeft, Loader2 } from "lucide-react";

function RecapContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const summoner = searchParams.get("summoner");
  const region = searchParams.get("region");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playerData, setPlayerData] = useState<any>(null);
  const [recap, setRecap] = useState<any>(null);

  useEffect(() => {
    if (!summoner || !region) {
      router.push("/");
      return;
    }

    fetchRecapData();
  }, [summoner, region]);

  const fetchRecapData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch player stats
      const playerResponse = await fetch(
        `/api/player?summoner=${encodeURIComponent(summoner!)}&region=${region}`
      );
      
      if (!playerResponse.ok) {
        throw new Error("Failed to fetch player data");
      }

      const playerData = await playerResponse.json();
      setPlayerData(playerData);

      // Generate AI recap
      const recapResponse = await fetch("/api/recap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summonerName: summoner,
          stats: playerData.stats,
        }),
      });

      if (!recapResponse.ok) {
        throw new Error("Failed to generate recap");
      }

      const recapData = await recapResponse.json();
      setRecap(recapData.recap);
    } catch (err: any) {
      console.error("Error fetching recap:", err);
      setError(err.message || "Failed to load recap");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!navigator.share) {
      // Fallback: Copy to clipboard
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
      return;
    }

    try {
      await navigator.share({
        title: `${summoner}'s Rift Rewind 2025`,
        text: recap?.shareableQuote || "Check out my League of Legends year in review!",
        url: window.location.href,
      });
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const handleDownload = () => {
    // In a real app, this would generate and download an image
    alert("Image download feature coming soon! For now, take a screenshot 📸");
  };

  if (loading) {
    return (
      <div className="min-h-screen lol-gradient flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" />
          <div className="space-y-2">
            <p className="text-xl font-bold">Analyzing Your Journey...</p>
            <p className="text-muted-foreground">Summoning your stats from the Rift</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen lol-gradient flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-destructive">Error</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => router.push("/")} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  if (!playerData || !recap) {
    return null;
  }

  const { stats } = playerData;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Victory Celebration Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/274e0549-08f4-4005-a5b6-68f64acea3dd/generated_images/league-of-legends-victory-celebration-ba-a6f7b15e-20250930185319.jpg)',
        }}
      />
      {/* Dark overlay for better text visibility */}
      <div className="fixed inset-0 bg-black/40" />

      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleShare}
              className="border-primary/20 hover:border-primary/50"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              onClick={handleDownload}
              className="border-primary/20 hover:border-primary/50"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-2">
            <span className="text-sm font-medium text-primary">2025 Season Recap</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black gold-glow bg-gradient-to-b from-primary via-primary to-primary/50 bg-clip-text text-transparent">
            {summoner}
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {recap.opening}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <RecapCard type="stats" data={stats} />
          <RecapCard type="champion" data={stats} />
        </div>

        {/* AI Insights */}
        <div className="mb-12">
          <Card className="relative overflow-hidden bg-gradient-to-br from-card via-primary/5 to-card border-2 border-primary/20 p-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-bold mb-6">Your Story</h2>
              
              <div className="space-y-4">
                <div className="p-6 rounded-lg bg-background/50 border border-primary/10">
                  <h3 className="text-lg font-semibold mb-2 text-primary">Role Mastery</h3>
                  <p className="text-muted-foreground leading-relaxed">{recap.roleInsight}</p>
                </div>
                
                <div className="p-6 rounded-lg bg-background/50 border border-primary/10">
                  <h3 className="text-lg font-semibold mb-2 text-primary">Champion Journey</h3>
                  <p className="text-muted-foreground leading-relaxed">{recap.championStory}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Highlights and Playstyle */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <RecapCard type="highlights" data={recap} />
          <RecapCard type="playstyle" data={{ ...recap, ...stats }} />
        </div>

        {/* Top Champions List */}
        <Card className="mb-12 p-8 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
          <h2 className="text-3xl font-bold mb-6">Your Champion Pool</h2>
          <div className="space-y-4">
            {stats.topChampions.map((champ: any, index: number) => (
              <div
                key={champ.name}
                className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/30 transition-colors"
              >
                <div className="text-2xl font-bold text-primary w-8">{index + 1}</div>
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champ.name.replace(/[^a-zA-Z]/g, '')}.png`}
                  alt={champ.name}
                  className="w-12 h-12 rounded-full border-2 border-primary"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=50&h=50&fit=crop`;
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{champ.name}</h3>
                  <p className="text-sm text-muted-foreground">{champ.games} games</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-lg font-bold text-primary">{champ.winRate.toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground">{champ.kda.toFixed(2)} KDA</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Closing Message */}
        <Card className="p-8 text-center bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-2 border-primary/20">
          <p className="text-2xl font-bold mb-4 gold-glow">{recap.closing}</p>
          <p className="text-lg text-muted-foreground italic mb-6">{recap.shareableQuote}</p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={handleShare}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Your Recap
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Powered by Riot Games API × AWS AI Services</p>
          <p className="mt-2">Built for the Rift Rewind Hackathon 2025</p>
        </div>
      </div>
    </div>
  );
}

export default function RecapPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen lol-gradient flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-primary animate-spin" />
      </div>
    }>
      <RecapContent />
    </Suspense>
  );
}