import { auth } from "@/auth";
import type { TimeRange } from "@/lib/constants";
import { FREE_LIMITS } from "@/lib/constants";
import {
  attachPlayCounts,
  aggregateArtistPlayCounts,
  computeGenreStats,
  computeListeningPatterns,
  deriveTopAlbums,
  estimateTotalListeningMs,
  buildPlayCounts,
} from "./analytics";
import {
  getCurrentUser,
  getRecentlyPlayed,
  getTopArtists,
  getTopTracks,
  SpotifyApiError,
} from "./client";
import type { TuneStatsData } from "./types";

export async function getAccessToken(): Promise<string | null> {
  const session = await auth();
  return session?.accessToken ?? null;
}

export async function fetchTuneStatsData(
  timeRange: TimeRange = "short_term"
): Promise<TuneStatsData | null> {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const [user, topArtistsRaw, topTracksRaw, recentItems] = await Promise.all([
      getCurrentUser(token),
      getTopArtists(token, timeRange, FREE_LIMITS.topArtists),
      getTopTracks(token, timeRange, FREE_LIMITS.topTracks),
      getRecentlyPlayed(token, FREE_LIMITS.recentTracks),
    ]);

    const playCounts = buildPlayCounts(recentItems);
    const topTracks = attachPlayCounts(topTracksRaw, playCounts);
    const artistPlayCounts = aggregateArtistPlayCounts(topTracks);

    // Top artists response already includes genres — no extra /artists batch call
    const topArtists = attachPlayCounts(topArtistsRaw, artistPlayCounts).sort(
      (a, b) => b.playCount - a.playCount
    );

    const topAlbums = deriveTopAlbums(topTracks);
    const patterns = computeListeningPatterns(recentItems);
    const genres = computeGenreStats(topArtists, artistPlayCounts);
    const totalListeningMs = estimateTotalListeningMs(
      topTracks,
      patterns.totalMs
    );

    return {
      user,
      timeRange,
      topArtists,
      topTracks,
      topAlbums,
      recentTracks: recentItems.map((i) => i.track),
      genres,
      patterns,
      totalListeningMs,
    };
  } catch (e) {
    if (e instanceof SpotifyApiError) {
      if (e.status === 401) return null;
      // Surface friendly errors (403 = dev mode / permissions)
      throw e;
    }
    throw e;
  }
}

export async function fetchArtistDetail(artistId: string) {
  const token = await getAccessToken();
  if (!token) return null;
  const data = await fetchTuneStatsData();
  const artist = data?.topArtists.find((a) => a.id === artistId);
  if (!artist) {
    const { getArtist } = await import("./client");
    const full = await getArtist(token, artistId);
    return { artist: full, playCount: 0, tracks: [] };
  }
  const tracks =
    data?.topTracks.filter((t) =>
      t.artists.some((a) => a.id === artistId)
    ) ?? [];
  return { artist, playCount: artist.playCount, tracks };
}

export async function fetchTrackDetail(trackId: string) {
  const token = await getAccessToken();
  if (!token) return null;
  const data = await fetchTuneStatsData();
  const track = data?.topTracks.find((t) => t.id === trackId);
  if (track) return { track, playCount: track.playCount };
  const { getTrack } = await import("./client");
  const full = await getTrack(token, trackId);
  return { track: full, playCount: 0 };
}

export async function fetchAlbumDetail(albumId: string) {
  const data = await fetchTuneStatsData();
  const album = data?.topAlbums.find((a) => a.id === albumId);
  if (!album || !data) return null;
  const tracks = data.topTracks.filter((t) => t.album.id === albumId);
  return { album, tracks };
}
