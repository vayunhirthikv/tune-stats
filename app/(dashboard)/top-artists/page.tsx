import { Header } from "@/components/layout/header";
import { ArtistGrid } from "@/components/music/artist-grid";
import { Disclaimer } from "@/components/shared/disclaimer";
import { PlusTeaser } from "@/components/shared/plus-teaser";
import { fetchTuneStatsData } from "@/lib/spotify/data";
import { getTimeRangeFromSearch } from "@/lib/get-time-range";
import { DISCLAIMERS, FREE_LIMITS } from "@/lib/constants";

interface PageProps {
  searchParams: Promise<{ range?: string }>;
}

export default async function TopArtistsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const data = await fetchTuneStatsData(getTimeRangeFromSearch(params.range));

  if (!data) return null;

  return (
    <>
      <Header
        title="Top Artists"
        description={`Your top ${FREE_LIMITS.topArtists} artists for this period`}
      />
      <ArtistGrid artists={data.topArtists} showPlayCount />
      <Disclaimer text={DISCLAIMERS.playCounts} />
      <PlusTeaser
        compact
        title="Want play counts beyond 50?"
        description="TuneStats Plus unlocks exact counts from your full imported history."
      />
    </>
  );
}
