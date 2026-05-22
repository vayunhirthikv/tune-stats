export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images: SpotifyImage[];
  genres?: string[];
  external_urls: { spotify: string };
  popularity?: number;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
  artists: { id: string; name: string }[];
  release_date?: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  duration_ms: number;
  album: SpotifyAlbum;
  artists: { id: string; name: string }[];
  external_urls: { spotify: string };
  popularity?: number;
}

export interface SpotifyTopItem<T> {
  items: T[];
}

export interface SpotifyRecentlyPlayed {
  items: {
    played_at: string;
    track: SpotifyTrack;
  }[];
}

export interface SpotifyUser {
  id: string;
  display_name: string | null;
  email: string;
  images: SpotifyImage[];
  country: string;
  product: string;
  followers?: { total: number };
  external_urls: { spotify: string };
}

export interface PlayCountEntry {
  id: string;
  count: number;
}

export interface DerivedAlbum {
  id: string;
  name: string;
  image: string;
  artistName: string;
  artistId: string;
  playCount: number;
  trackCount: number;
}

export interface GenreStat {
  genre: string;
  count: number;
  percentage: number;
}

export interface ListeningPatterns {
  byHour: { hour: number; count: number }[];
  byDay: { day: string; dayIndex: number; count: number }[];
  mostActiveHour: number;
  mostActiveDay: string;
  totalMs: number;
}

export interface TuneStatsData {
  user: SpotifyUser;
  timeRange: string;
  topArtists: (SpotifyArtist & { playCount: number })[];
  topTracks: (SpotifyTrack & { playCount: number })[];
  topAlbums: DerivedAlbum[];
  recentTracks: SpotifyTrack[];
  genres: GenreStat[];
  patterns: ListeningPatterns;
  totalListeningMs: number;
}
