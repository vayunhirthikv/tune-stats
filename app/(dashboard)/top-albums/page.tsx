import { Header } from "@/components/layout/header";
import { AlbumGrid } from "@/components/music/album-grid";
import { PlusTeaser } from "@/components/shared/plus-teaser";
import { fetchTuneStatsData } from "@/lib/spotify/data";
import { getTimeRangeFromSearch } from "@/lib/get-time-range";
import { FREE_LIMITS } from "@/lib/constants";

interface PageProps {
  searchParams: Promise<{ range?: string }>;
}

export default async function TopAlbumsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const data = await fetchTuneStatsData(getTimeRangeFromSearch(params.range));

  if (!data) return null;

  return (
    <>
      <Header
        title="Top Albums"
        description={`Top ${FREE_LIMITS.topAlbums} albums derived from your top tracks (Free tier)`}
      />
      <AlbumGrid albums={data.topAlbums} />
      <p className="text-sm text-muted-foreground mt-4">
        Album play counts are estimated by aggregating plays from your top tracks
        in the same album.
      </p>
      <PlusTeaser
        title="More than 10 albums?"
        description="Plus members get unlimited album rankings from full history import."
        features={[
          "Top 100+ albums from lifetime data",
          "Precise per-album play counts",
          "Release year & label insights",
        ]}
      />
    </>
  );
}
