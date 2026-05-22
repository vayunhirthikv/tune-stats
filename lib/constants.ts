/** Free tier limits */
export const FREE_LIMITS = {
  topArtists: 50,
  topTracks: 50,
  topAlbums: 10,
  maxPlayCount: 50,
  recentTracks: 50,
  topGenres: 10,
  dashboardArtists: 10,
  dashboardTracks: 10,
} as const;

export const TIME_RANGES = [
  { value: "short_term", label: "Last 4 weeks" },
  { value: "medium_term", label: "Last 6 months" },
  { value: "long_term", label: "Last year" },
] as const;

export type TimeRange = (typeof TIME_RANGES)[number]["value"];

export const SPOTIFY_SCOPES = [
  "user-read-email",
  "user-read-private",
  "user-top-read",
  "user-read-recently-played",
].join(" ");

export const DISCLAIMERS = {
  playCounts:
    "Based on available data from your recent listening activity. Counts are capped at 50 on the free tier.",
  patterns:
    "Limited to recent activity. Import full history with Plus for complete stats.",
  genres:
    "Genres are inferred from your top artists' metadata.",
} as const;
