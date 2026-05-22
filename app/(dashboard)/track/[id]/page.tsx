import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchTrackDetail } from "@/lib/spotify/data";
import { formatNumber } from "@/lib/utils";
import { ExternalLink, ArrowLeft, Disc3 } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TrackDetailPage({ params }: PageProps) {
  const { id } = await params;
  const result = await fetchTrackDetail(id);
  if (!result) notFound();

  const { track, playCount } = result;
  const image = track.album.images[0]?.url;

  return (
    <div className="max-w-xl">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/top-tracks">
          <ArrowLeft className="h-4 w-4" /> Back to tracks
        </Link>
      </Button>

      <Card>
        <CardContent className="p-6">
          <div className="flex gap-6">
            <div className="relative h-32 w-32 rounded-lg overflow-hidden shrink-0 bg-muted">
              {image && (
                <Image src={image} alt={track.album.name} fill className="object-cover" />
              )}
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">{track.name}</h1>
              <p className="text-muted-foreground mt-1">
                {track.artists.map((a) => a.name).join(", ")}
              </p>
              <Link
                href={`/album/${track.album.id}`}
                className="inline-flex items-center gap-1 text-sm text-accent mt-2 hover:underline"
              >
                <Disc3 className="h-3 w-3" />
                {track.album.name}
              </Link>
              {playCount > 0 && (
                <p className="text-spotify font-bold text-xl mt-4 tabular-nums">
                  {formatNumber(playCount)} plays
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Based on available data · max 50 on free tier
              </p>
              <a
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary mt-4 hover:underline"
              >
                Open on Spotify <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
