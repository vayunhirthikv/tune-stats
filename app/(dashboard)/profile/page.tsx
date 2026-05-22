import { Header } from "@/components/layout/header";
import { ProfileHeader } from "@/components/music/profile-header";
import { ShareCard } from "@/components/profile/share-card";
import { PlusTeaser } from "@/components/shared/plus-teaser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchTuneStatsData } from "@/lib/spotify/data";
import { getTimeRangeFromSearch } from "@/lib/get-time-range";
import { formatDuration, formatNumber } from "@/lib/utils";
import { Globe, Users } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ range?: string }>;
}

export default async function ProfilePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const data = await fetchTuneStatsData(getTimeRangeFromSearch(params.range));

  if (!data) return null;

  return (
    <>
      <Header
        title="Profile"
        description="Your public stats & shareable music personality card"
        showTimeRange
      />

      <ProfileHeader user={data.user} />

      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-2xl font-bold text-spotify">
              {formatNumber(data.topArtists.length)}
            </p>
            <p className="text-sm text-muted-foreground">Top Artists Tracked</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-2xl font-bold">{formatDuration(data.totalListeningMs)}</p>
            <p className="text-sm text-muted-foreground">Listening Time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-2xl font-bold text-accent">{data.genres[0]?.genre ?? "—"}</p>
            <p className="text-sm text-muted-foreground">Top Genre</p>
          </CardContent>
        </Card>
      </div>

      <section className="mt-10">
        <CardHeader className="px-0">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Shareable Music Personality
          </CardTitle>
        </CardHeader>
        <ShareCard data={data} />
      </section>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Public Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Your profile URL (share with friends):
          </p>
          <code className="block p-3 rounded-lg bg-muted text-sm break-all">
            {`/profile/${data.user.id}`}
          </code>
          <p className="text-xs text-muted-foreground mt-2">
            Full public profile pages with soulmate matching require TuneStats Plus.
          </p>
        </CardContent>
      </Card>

      <PlusTeaser
        title="Make your profile legendary"
        description="Plus adds custom themes, animated cards, soulmate comparisons, and badge showcases."
        features={[
          "Public profile with custom slug",
          "Compare stats with friends (soulmates)",
          "Animated & themed share cards",
          "Profile badges & milestones",
        ]}
      />
    </>
  );
}
