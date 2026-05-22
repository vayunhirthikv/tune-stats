import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrackList } from "@/components/music/track-list";
import { fetchAlbumDetail } from "@/lib/spotify/data";
import { formatNumber } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AlbumDetailPage({ params }: PageProps) {
  const { id } = await params;
  const result = await fetchAlbumDetail(id);
  if (!result) notFound();

  const { album, tracks } = result;

  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/top-albums">
          <ArrowLeft className="h-4 w-4" /> Back to albums
        </Link>
      </Button>

      <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
        <div className="relative h-48 w-48 rounded-xl overflow-hidden shrink-0 bg-muted">
          {album.image && (
            <Image src={album.image} alt={album.name} fill className="object-cover" />
          )}
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold">{album.name}</h1>
          <Link
            href={`/artist/${album.artistId}`}
            className="text-muted-foreground hover:text-primary transition"
          >
            {album.artistName}
          </Link>
          <p className="text-accent font-semibold mt-3 tabular-nums">
            ~{formatNumber(album.playCount)} estimated plays · {album.trackCount} tracks in top list
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Derived from top tracks · Free tier limited to top 10 albums
          </p>
        </div>
      </div>

      {tracks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Tracks from this album in your tops</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <TrackList tracks={tracks} showPlayCount />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
