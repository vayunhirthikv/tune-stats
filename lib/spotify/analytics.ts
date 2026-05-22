import { capPlayCount } from "@/lib/utils";
import { FREE_LIMITS } from "@/lib/constants";
import type {
  DerivedAlbum,
  GenreStat,
  ListeningPatterns,
  SpotifyArtist,
  SpotifyTrack,
} from "./types";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Build play counts from recently played history (free tier proxy for exact counts) */
export function buildPlayCounts(
  recentItems: { played_at: string; track: SpotifyTrack }[]
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const item of recentItems) {
    const id = item.track.id;
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return counts;
}

export function attachPlayCounts<T extends { id: string }>(
  items: T[],
  playCounts: Map<string, number>,
  max = FREE_LIMITS.maxPlayCount
): (T & { playCount: number })[] {
  return items.map((item, index) => {
    const fromRecent = playCounts.get(item.id) ?? 0;
    // Fallback: inverse rank estimate when no recent data (1–50 scale)
    const fallback = Math.max(1, max - index);
    const raw = fromRecent > 0 ? fromRecent : fallback;
    return { ...item, playCount: capPlayCount(raw, max) };
  });
}

export function aggregateArtistPlayCounts(
  tracks: (SpotifyTrack & { playCount: number })[]
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const track of tracks) {
    for (const artist of track.artists) {
      counts.set(
        artist.id,
        (counts.get(artist.id) ?? 0) + track.playCount
      );
    }
  }
  return counts;
}

/** Derive top albums from top tracks (free tier: max 10) */
export function deriveTopAlbums(
  tracks: (SpotifyTrack & { playCount: number })[],
  limit = FREE_LIMITS.topAlbums
): DerivedAlbum[] {
  const albumMap = new Map<
    string,
    {
      album: SpotifyTrack["album"];
      artist: SpotifyTrack["artists"][0];
      playCount: number;
      trackIds: Set<string>;
    }
  >();

  for (const track of tracks) {
    const album = track.album;
    const existing = albumMap.get(album.id);
    if (existing) {
      existing.playCount += track.playCount;
      existing.trackIds.add(track.id);
    } else {
      albumMap.set(album.id, {
        album,
        artist: track.artists[0],
        playCount: track.playCount,
        trackIds: new Set([track.id]),
      });
    }
  }

  return Array.from(albumMap.values())
    .map(({ album, artist, playCount, trackIds }) => ({
      id: album.id,
      name: album.name,
      image: album.images[0]?.url ?? "",
      artistName: artist.name,
      artistId: artist.id,
      playCount: capPlayCount(playCount),
      trackCount: trackIds.size,
    }))
    .sort((a, b) => b.playCount - a.playCount)
    .slice(0, limit);
}

/** Genre distribution from top artists */
export function computeGenreStats(
  artists: SpotifyArtist[],
  artistPlayCounts: Map<string, number>,
  limit = FREE_LIMITS.topGenres
): GenreStat[] {
  const genreWeights = new Map<string, number>();

  for (const artist of artists) {
    const weight = artistPlayCounts.get(artist.id) ?? 1;
    const genres = artist.genres ?? [];
    if (genres.length === 0) {
      genreWeights.set("unknown", (genreWeights.get("unknown") ?? 0) + weight);
      continue;
    }
    for (const genre of genres.slice(0, 3)) {
      genreWeights.set(genre, (genreWeights.get(genre) ?? 0) + weight);
    }
  }

  const total = Array.from(genreWeights.values()).reduce((a, b) => a + b, 0);
  if (total === 0) return [];

  return Array.from(genreWeights.entries())
    .map(([genre, count]) => ({
      genre: formatGenreLabel(genre),
      count: Math.round(count),
      percentage: Math.round((count / total) * 1000) / 10,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

function formatGenreLabel(genre: string): string {
  return genre
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Listening patterns from recently played timestamps */
export function computeListeningPatterns(
  recentItems: { played_at: string; track: SpotifyTrack }[]
): ListeningPatterns {
  const hourCounts = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    count: 0,
  }));
  const dayCounts = DAY_NAMES.map((day, dayIndex) => ({
    day,
    dayIndex,
    count: 0,
  }));

  let totalMs = 0;

  for (const item of recentItems) {
    const date = new Date(item.played_at);
    hourCounts[date.getHours()].count += 1;
    dayCounts[date.getDay()].count += 1;
    totalMs += item.track.duration_ms;
  }

  const mostActiveHour = hourCounts.reduce((best, cur) =>
    cur.count > best.count ? cur : best
  ).hour;

  const mostActiveDay = dayCounts.reduce((best, cur) =>
    cur.count > best.count ? cur : best
  ).day;

  return {
    byHour: hourCounts,
    byDay: dayCounts,
    mostActiveHour,
    mostActiveDay,
    totalMs,
  };
}

export function estimateTotalListeningMs(
  tracks: (SpotifyTrack & { playCount: number })[],
  recentTotalMs: number
): number {
  const fromTop = tracks.reduce(
    (sum, t) => sum + t.duration_ms * t.playCount,
    0
  );
  return Math.max(fromTop, recentTotalMs);
}

export function getFunFacts(data: {
  topArtist: SpotifyArtist | undefined;
  topTrack: SpotifyTrack | undefined;
  genres: GenreStat[];
  patterns: ListeningPatterns;
  totalTracks: number;
}): string[] {
  const facts: string[] = [];
  if (data.topArtist) {
    facts.push(`Your #1 artist is ${data.topArtist.name}.`);
  }
  if (data.topTrack) {
    facts.push(`Most played track: "${data.topTrack.name}".`);
  }
  if (data.genres[0]) {
    facts.push(
      `Top genre: ${data.genres[0].genre} (${data.genres[0].percentage}%).`
    );
  }
  facts.push(
    `You're most active on ${data.patterns.mostActiveDay}s around ${formatHour(data.patterns.mostActiveHour)}.`
  );
  facts.push(`Tracking ${data.totalTracks} top tracks in this period.`);
  return facts;
}

function formatHour(h: number): string {
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:00 ${period}`;
}
