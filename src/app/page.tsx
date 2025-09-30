"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Sparkles, Trophy, TrendingUp } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [summonerName, setSummonerName] = useState("");
  const [region, setRegion] = useState("na1");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!summonerName.trim()) return;

    setIsLoading(true);
    // Navigate to the recap page with query params
    router.push(`/recap?summoner=${encodeURIComponent(summonerName)}&region=${region}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Zeri Electric Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/274e0549-08f4-4005-a5b6-68f64acea3dd/generated_images/zeri-from-league-of-legends-electric-spa-518a50c9-20250930185303.jpg)',
        }}
      />
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">League of Legends 2025 Wrapped</span>
          </div>
          
          <h1 className="hero-text gold-glow bg-gradient-to-b from-primary via-primary to-primary/50 bg-clip-text text-transparent">
            YOUR RIFT
            <br />
            REWIND
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Discover your League of Legends journey through 2025. 
            <br />
            AI-powered insights. Epic highlights. Shareable moments.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
            <Trophy className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Year in Review</h3>
            <p className="text-sm text-muted-foreground">Your complete season stats, visualized beautifully</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">AI Storytelling</h3>
            <p className="text-sm text-muted-foreground">Personalized insights powered by AWS AI</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Share Your Glory</h3>
            <p className="text-sm text-muted-foreground">Create shareable cards for social media</p>
          </div>
        </div>

        {/* Input Form */}
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-card/80 backdrop-blur-md border-2 border-primary/20 rounded-xl p-8 shadow-2xl">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Summoner Name</label>
                  <Input
                    type="text"
                    placeholder="Hide on bush"
                    value={summonerName}
                    onChange={(e) => setSummonerName(e.target.value)}
                    className="bg-background/50 border-border text-lg h-12"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Region</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-background/50 border border-border rounded-md px-3 h-12 text-foreground"
                  >
                    <option value="na1">North America</option>
                    <option value="euw1">Europe West</option>
                    <option value="eun1">Europe Nordic & East</option>
                    <option value="kr">Korea</option>
                    <option value="br1">Brazil</option>
                    <option value="la1">Latin America North</option>
                    <option value="la2">Latin America South</option>
                    <option value="oc1">Oceania</option>
                    <option value="ru">Russia</option>
                    <option value="tr1">Turkey</option>
                    <option value="jp1">Japan</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !summonerName.trim()}
                  className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Loading Your Story...
                    </span>
                  ) : (
                    "Generate My Rift Rewind"
                  )}
                </Button>
              </div>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Powered by Riot Games API × AWS AI Services
          </p>
        </div>
      </div>
    </div>
  );
}