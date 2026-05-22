import Link from "next/link";
import { Header } from "@/components/layout/header";
import { ProfileHeader } from "@/components/music/profile-header";
import { ArtistGrid } from "@/components/music/artist-grid";
import { TrackList } from "@/components/music/track-list";
import { AlbumGrid } from "@/components/music/album-grid";
import { StatCard } from "@/components/shared/stat-card";
import { Disclaimer } from "@/components/shared/disclaimer";
import { PlusTeaser } from "@/components/shared/plus-teaser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListeningClockChart } from "@/components/charts/listening-clock-chart";
import { DayOfWeekChart } from "@/components/charts/day-of-week-chart";
import { GenreBarList } from "@/components/charts/genre-bar-list";
import { fetchTuneStatsData } from "@/lib/spotify/data";
import { getTimeRangeFromSearch } from "@/lib/get-time-range";
import { formatDuration } from "@/lib/utils";
import { DISCLAIMERS, FREE_LIMITS } from "@/lib/constants";
import { Clock, Calendar, Headphones, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  searchParams: Promise<{ range?: string }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const timeRange = getTimeRangeFromSearch(params.range);
  const data = await fetchTuneStatsData(timeRange);

  if (!data) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Unable to load stats. Please sign in again.</p>
      </div>
    );
  }

  return (
    <>
      <Header
        title="Dashboard"
        description="Your listening overview for the selected period"
      />

      <ProfileHeader user={data.user} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <StatCard
          title="Total Listening Time"
          value={formatDuration(data.totalListeningMs)}
          subtitle="Estimated from top tracks & recent plays"
          icon={Headphones}
          accent="spotify"
        />
        <StatCard
          title="Most Active Hour"
          value={`${data.patterns.mostActiveHour % 12 || 12}${data.patterns.mostActiveHour >= 12 ? "PM" : "AM"}`}
          icon={Clock}
        />
        <StatCard
          title="Most Active Day"
          value={data.patterns.mostActiveDay}
          icon={Calendar}
          accent="gold"
        />
      </div>
      <Disclaimer text={DISCLAIMERS.patterns} />

      <section className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Top {FREE_LIMITS.dashboardArtists} Artists</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/top-artists">
              View all 50 <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <ArtistGrid
          artists={data.topArtists}
          limit={FREE_LIMITS.dashboardArtists}
        />
        <Disclaimer text={DISCLAIMERS.playCounts} />
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Top {FREE_LIMITS.dashboardTracks} Tracks</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/top-tracks">
              View all 50 <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-2">
            <TrackList
              tracks={data.topTracks}
              limit={FREE_LIMITS.dashboardTracks}
            />
          </CardContent>
        </Card>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Top {FREE_LIMITS.topAlbums} Albums</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/top-albums">View albums</Link>
          </Button>
        </div>
        <AlbumGrid albums={data.topAlbums} />
      </section>

      <div className="grid lg:grid-cols-2 gap-6 mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Listening Clock</CardTitle>
            <Disclaimer text={DISCLAIMERS.patterns} />
          </CardHeader>
          <CardContent>
            <ListeningClockChart
              data={data.patterns.byHour}
              mostActiveHour={data.patterns.mostActiveHour}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Listening by Day</CardTitle>
          </CardHeader>
          <CardContent>
            <DayOfWeekChart
              data={data.patterns.byDay}
              mostActiveDay={data.patterns.mostActiveDay}
            />
          </CardContent>
        </Card>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Top Genres</h2>
        <Card>
          <CardContent className="pt-6">
            <GenreBarList genres={data.genres.slice(0, FREE_LIMITS.topGenres)} />
            <Disclaimer text={DISCLAIMERS.genres} />
          </CardContent>
        </Card>
      </section>

      <PlusTeaser
        title="Unlock the full stats.fm experience"
        description="Import your lifetime Spotify history, get unlimited play counts, custom date ranges, soulmates, badges, and more."
        features={[
          "Lifetime JSON history import",
          "Unlimited play counts & albums",
          "Custom date range analytics",
          "Soulmates, badges & advanced insights",
        ]}
      />
    </>
  );
}
