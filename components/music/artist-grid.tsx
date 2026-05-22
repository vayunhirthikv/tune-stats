import Image from "next/image";
import Link from "next/link";
import type { SpotifyArtist } from "@/lib/spotify/types";
import { formatNumber } from "@/lib/utils";

interface ArtistWithCount extends SpotifyArtist {
  playCount?: number;
}

interface ArtistGridProps {
  artists: ArtistWithCount[];
  limit?: number;
  showPlayCount?: boolean;
}

export function ArtistGrid({
  artists,
  limit,
  showPlayCount = true,
}: ArtistGridProps) {
  const items = limit ? artists.slice(0, limit) : artists;

  return (
    // Collapsed-border newspaper column grid
    <div className="border-t border-l border-[#111111] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
      {items.map((artist, index) => (
        <Link
          key={artist.id}
          href={`/artist/${artist.id}`}
          className="border-r border-b border-[#111111] p-3 group bg-[#F9F9F7] hover:bg-[#F5F5F5] transition-colors duration-150 hard-shadow-hover"
        >
          {/* Image — grayscale */}
          <div className="relative aspect-square overflow-hidden bg-[#E5E5E0] mb-3">
            {artist.images[0] ? (
              <Image
                src={artist.images[0].url}
                alt={artist.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-display text-3xl text-[#A3A3A3]">
                ♪
              </div>
            )}
            {/* Rank stamp */}
            <span className="absolute top-1.5 left-1.5 font-mono text-[9px] font-bold bg-[#111111] text-[#F9F9F7] px-1.5 py-0.5 leading-none">
              #{index + 1}
            </span>
          </div>

          <p className="font-display font-bold text-sm leading-tight truncate text-[#111111] group-hover:text-[#CC0000] transition-colors duration-150">
            {artist.name}
          </p>
          {showPlayCount && artist.playCount !== undefined && (
            <p className="font-mono text-[10px] text-[#737373] mt-0.5 tabular-nums">
              {formatNumber(artist.playCount)} plays
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}
