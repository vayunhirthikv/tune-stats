import { Header } from "@/components/layout/header";
import { StatCard } from "@/components/shared/stat-card";
import { Disclaimer } from "@/components/shared/disclaimer";
import { PlusTeaser } from "@/components/shared/plus-teaser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListeningClockChart } from "@/components/charts/listening-clock-chart";
import { DayOfWeekChart } from "@/components/charts/day-of-week-chart";
import { GenrePieChart } from "@/components/charts/genre-pie-chart";
import { GenreBarList } from "@/components/charts/genre-bar-list";
import { fetchTuneStatsData } from "@/lib/spotify/data";
import { getTimeRangeFromSearch } from "@/lib/get-time-range";
import { getFunFacts } from "@/lib/spotify/analytics";
import { formatDuration } from "@/lib/utils";
import { DISCLAIMERS } from "@/lib/constants";
import { Headphones, Sparkles, Clock, Calendar } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ range?: string }>;
}

export default async function InsightsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const data = await fetchTuneStatsData(getTimeRangeFromSearch(params.range));

  if (!data) return null;

  const funFacts = getFunFacts({
    topArtist: data.topArtists[0],
    topTrack: data.topTracks[0],
    genres: data.genres,
    patterns: data.patterns,
    totalTracks: data.topTracks.length,
  });

  return (
    <>
      <Header
        title="Insights"
        description="Listening time, patterns, genres & highlights"
        showTimeRange
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Listening Time"
          value={formatDuration(data.totalListeningMs)}
          icon={Headphones}
          accent="spotify"
        />
        <StatCard
          title="Peak Hour"
          value={`${data.patterns.mostActiveHour % 12 || 12}${data.patterns.mostActiveHour >= 12 ? "PM" : "AM"}`}
          icon={Clock}
        />
        <StatCard
          title="Peak Day"
          value={data.patterns.mostActiveDay}
          icon={Calendar}
          accent="gold"
        />
        <StatCard
          title="Genre Diversity"
          value={`${data.genres.length} genres`}
          subtitle="From top artist metadata"
          icon={Sparkles}
        />
      </div>
      <Disclaimer text={DISCLAIMERS.patterns} />

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Listening Clock (24h)</CardTitle>
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
            <CardTitle>By Day of Week</CardTitle>
          </CardHeader>
          <CardContent>
            <DayOfWeekChart
              data={data.patterns.byDay}
              mostActiveDay={data.patterns.mostActiveDay}
            />
          </CardContent>
        </Card>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Genre Breakdown</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <GenrePieChart genres={data.genres} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top 10 Genres</CardTitle>
              <Disclaimer text={DISCLAIMERS.genres} />
            </CardHeader>
            <CardContent>
              <GenreBarList genres={data.genres} />
            </CardContent>
          </Card>
        </div>
      </section>

      <Card className="mt-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Fun Facts & Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {funFacts.map((fact) => (
              <li
                key={fact}
                className="flex items-start gap-2 text-sm border-l-2 border-spotify pl-4 py-1"
              >
                {fact}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <PlusTeaser
        title="Advanced analytics — Plus only"
        description="Mood scores, genre diversity index, soulmates, badges, and unlimited history await in TuneStats Plus."
        features={[
          "Mood score & audio feature analysis",
          "Soulmate matching with friends",
          "Achievement badges",
          "Custom date range beyond Spotify presets",
        ]}
      />
    </>
  );
}
