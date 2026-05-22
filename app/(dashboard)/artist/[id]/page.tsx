import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { TrackList } from "@/components/music/track-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchArtistDetail } from "@/lib/spotify/data";
import { formatNumber } from "@/lib/utils";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArtistDetailPage({ params }: PageProps) {
  const { id } = await params;
  const result = await fetchArtistDetail(id);
  if (!result) notFound();

  const { artist, playCount, tracks } = result;
  const image = artist.images[0]?.url;

  return (
    <>
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/top-artists">
          <ArrowLeft className="h-4 w-4" /> Back to artists
        </Link>
      </Button>

      <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
        <div className="relative h-40 w-40 rounded-xl overflow-hidden shrink-0 bg-muted">
          {image && (
            <Image src={image} alt={artist.name} fill className="object-cover" sizes="160px" />
          )}
        </div>
        <div>
          <Header title={artist.name} showTimeRange={false} />
          {playCount > 0 && (
            <p className="text-spotify font-semibold tabular-nums">
              {formatNumber(playCount)} plays (capped at 50)
            </p>
          )}
          {artist.genres && artist.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {artist.genres.slice(0, 5).map((g) => (
                <Badge key={g} variant="secondary">
                  {g}
                </Badge>
              ))}
            </div>
          )}
          <a
            href={artist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary mt-4 hover:underline"
          >
            Open on Spotify <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {tracks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Top Tracks by {artist.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <TrackList tracks={tracks} showPlayCount />
          </CardContent>
        </Card>
      )}
    </>
  );
}
