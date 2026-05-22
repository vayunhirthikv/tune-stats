import type { TimeRange } from "@/lib/constants";
import type {
  SpotifyArtist,
  SpotifyRecentlyPlayed,
  SpotifyTopItem,
  SpotifyTrack,
  SpotifyUser,
} from "./types";

const SPOTIFY_API = "https://api.spotify.com/v1";

export class SpotifyApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "SpotifyApiError";
  }
}

async function spotifyFetch<T>(
  path: string,
  accessToken: string,
  params?: Record<string, string>
): Promise<T> {
  const url = new URL(`${SPOTIFY_API}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new SpotifyApiError(
      `Spotify API ${res.status}: ${body}`,
      res.status
    );
  }

  return res.json() as Promise<T>;
}

export async function getCurrentUser(accessToken: string): Promise<SpotifyUser> {
  return spotifyFetch<SpotifyUser>("/me", accessToken);
}

export async function getTopArtists(
  accessToken: string,
  timeRange: TimeRange,
  limit = 50
): Promise<SpotifyArtist[]> {
  const data = await spotifyFetch<SpotifyTopItem<SpotifyArtist>>(
    "/me/top/artists",
    accessToken,
    { time_range: timeRange, limit: String(limit) }
  );
  return data.items;
}

export async function getTopTracks(
  accessToken: string,
  timeRange: TimeRange,
  limit = 50
): Promise<SpotifyTrack[]> {
  const data = await spotifyFetch<SpotifyTopItem<SpotifyTrack>>(
    "/me/top/tracks",
    accessToken,
    { time_range: timeRange, limit: String(limit) }
  );
  return data.items;
}

/** Spotify returns max 50 recently played items per request */
export async function getRecentlyPlayed(
  accessToken: string,
  limit = 50
): Promise<SpotifyRecentlyPlayed["items"]> {
  const data = await spotifyFetch<SpotifyRecentlyPlayed>(
    "/me/player/recently-played",
    accessToken,
    { limit: String(limit) }
  );
  return data.items;
}

export async function getArtist(
  accessToken: string,
  id: string
): Promise<SpotifyArtist> {
  return spotifyFetch<SpotifyArtist>(`/artists/${id}`, accessToken);
}

export async function getTrack(
  accessToken: string,
  id: string
): Promise<SpotifyTrack> {
  return spotifyFetch<SpotifyTrack>(`/tracks/${id}`, accessToken);
}

export async function getSeveralArtists(
  accessToken: string,
  ids: string[]
): Promise<SpotifyArtist[]> {
  if (ids.length === 0) return [];
  const chunks: string[][] = [];
  for (let i = 0; i < ids.length; i += 50) {
    chunks.push(ids.slice(i, i + 50));
  }
  const results: SpotifyArtist[] = [];
  for (const chunk of chunks) {
    const data = await spotifyFetch<{ artists: SpotifyArtist[] }>(
      "/artists",
      accessToken,
      { ids: chunk.join(",") }
    );
    results.push(...data.artists.filter(Boolean));
  }
  return results;
}
