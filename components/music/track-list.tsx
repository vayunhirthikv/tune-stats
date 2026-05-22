import Image from "next/image";
import Link from "next/link";
import type { SpotifyTrack } from "@/lib/spotify/types";
import { formatNumber } from "@/lib/utils";

interface TrackWithCount extends SpotifyTrack {
  playCount?: number;
}

interface TrackListProps {
  tracks: TrackWithCount[];
  limit?: number;
  showPlayCount?: boolean;
}

export function TrackList({
  tracks,
  limit,
  showPlayCount = true,
}: TrackListProps) {
  const items = limit ? tracks.slice(0, limit) : tracks;

  return (
    <ol>
      {items.map((track, index) => (
        <li key={track.id} className="border-b border-[#111111]/10 last:border-b-0">
          <Link
            href={`/track/${track.id}`}
            className="flex items-center gap-4 px-4 py-3 hover:bg-[#F5F5F5] transition-colors duration-100 group"
          >
            {/* Rank — zero-padded monospace */}
            <span className="w-8 font-mono text-[11px] font-bold text-[#A3A3A3] shrink-0 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Artwork — grayscale, sharpened corners */}
            <div className="relative h-11 w-11 shrink-0 border border-[#111111]/20 overflow-hidden">
              {track.album.images[0] && (
                <Image
                  src={track.album.images[0].url}
                  alt={track.album.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  sizes="44px"
                />
              )}
            </div>

            {/* Track + artist */}
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-sm leading-tight truncate text-[#111111] group-hover:text-[#CC0000] transition-colors duration-150">
                {track.name}
              </p>
              <p className="font-sans text-[11px] text-[#737373] truncate mt-0.5">
                {track.artists.map((a) => a.name).join(", ")}
              </p>
            </div>

            {/* Play count */}
            {showPlayCount && track.playCount !== undefined && (
              <span className="font-mono text-[11px] text-[#737373] shrink-0 tabular-nums">
                {formatNumber(track.playCount)}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ol>
  );
}
