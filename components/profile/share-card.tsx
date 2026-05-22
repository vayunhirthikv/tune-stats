"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TuneStatsData } from "@/lib/spotify/types";
import { formatDuration } from "@/lib/utils";

interface ShareCardProps {
  data: TuneStatsData;
}

export function ShareCard({ data }: ShareCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const topArtist = data.topArtists[0];
  const topTrack = data.topTracks[0];
  const topGenre = data.genres[0];

  const exportImage = async () => {
    if (!ref.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(ref.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#0f1115",
      });
      const link = document.createElement("a");
      link.download = `tunestats-${data.user.display_name ?? "profile"}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        ref={ref}
        className="rounded-2xl p-8 bg-gradient-to-br from-[#0f1115] via-[#151a22] to-[#0f1115] border border-border max-w-md mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <span className="font-display text-xl font-bold text-gradient">
            TuneStats
          </span>
          <span className="text-xs text-muted-foreground">Music Personality</span>
        </div>
        <h3 className="text-2xl font-bold mb-1">
          {data.user.display_name ?? "Listener"}
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          {data.timeRange === "short_term"
            ? "Last 4 weeks"
            : data.timeRange === "medium_term"
              ? "Last 6 months"
              : "Last year"}
        </p>
        <div className="space-y-4 text-sm">
          {topArtist && (
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider">
                Top Artist
              </p>
              <p className="font-semibold text-lg text-spotify">{topArtist.name}</p>
            </div>
          )}
          {topTrack && (
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider">
                Top Track
              </p>
              <p className="font-semibold">{topTrack.name}</p>
            </div>
          )}
          {topGenre && (
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider">
                Top Genre
              </p>
              <p className="font-semibold text-accent">
                {topGenre.genre} ({topGenre.percentage}%)
              </p>
            </div>
          )}
          <div className="pt-4 border-t border-border/60 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Listening Time</p>
              <p className="font-bold">{formatDuration(data.totalListeningMs)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Peak Hour</p>
              <p className="font-bold">
                {data.patterns.mostActiveHour % 12 || 12}
                {data.patterns.mostActiveHour >= 12 ? "PM" : "AM"}
              </p>
            </div>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mt-6 text-center">
          tunestats.app · Free Tier
        </p>
      </div>
      <div className="flex justify-center gap-3">
        <Button onClick={exportImage} disabled={exporting} variant="spotify">
          <Download className="h-4 w-4" />
          {exporting ? "Exporting…" : "Export as PNG"}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: "My TuneStats Music Personality",
                text: `Check out my listening stats on TuneStats! Top artist: ${topArtist?.name}`,
                url: window.location.href,
              });
            }
          }}
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  );
}
