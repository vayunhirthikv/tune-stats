import { Header } from "@/components/layout/header";
import { TrackList } from "@/components/music/track-list";
import { Card, CardContent } from "@/components/ui/card";
import { Disclaimer } from "@/components/shared/disclaimer";
import { PlusTeaser } from "@/components/shared/plus-teaser";
import { fetchTuneStatsData } from "@/lib/spotify/data";
import { getTimeRangeFromSearch } from "@/lib/get-time-range";
import { DISCLAIMERS, FREE_LIMITS } from "@/lib/constants";

interface PageProps {
  searchParams: Promise<{ range?: string }>;
}

export default async function TopTracksPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const data = await fetchTuneStatsData(getTimeRangeFromSearch(params.range));

  if (!data) return null;

  return (
    <>
      <Header
        title="Top Tracks"
        description={`Up to ${FREE_LIMITS.topTracks} tracks with play counts (max ${FREE_LIMITS.maxPlayCount})`}
      />
      <Card>
        <CardContent className="p-2">
          <TrackList tracks={data.topTracks} showPlayCount />
        </CardContent>
      </Card>
      <Disclaimer text={DISCLAIMERS.playCounts} />

      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4">
          Recently Played ({FREE_LIMITS.recentTracks})
        </h2>
        <Card>
          <CardContent className="p-2">
            <TrackList
              tracks={data.recentTracks.map((t) => ({ ...t, playCount: undefined }))}
              showPlayCount={false}
            />
          </CardContent>
        </Card>
      </section>

      <PlusTeaser
        compact
        title="Unlimited history import"
        description="Upload your Spotify Extended Streaming History JSON with Plus for precise lifetime play counts."
      />
    </>
  );
}
