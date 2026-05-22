import Image from "next/image";
import Link from "next/link";
import type { DerivedAlbum } from "@/lib/spotify/types";
import { formatNumber } from "@/lib/utils";

export function AlbumGrid({ albums }: { albums: DerivedAlbum[] }) {
  return (
    <div className="border-t border-l border-[#111111] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {albums.map((album, index) => (
        <Link
          key={album.id}
          href={`/album/${album.id}`}
          className="border-r border-b border-[#111111] p-3 group bg-[#F9F9F7] hover:bg-[#F5F5F5] transition-colors duration-150 hard-shadow-hover"
        >
          <div className="relative aspect-square overflow-hidden bg-[#E5E5E0] mb-3">
            {album.image ? (
              <Image
                src={album.image}
                alt={album.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl">
                💿
              </div>
            )}
            <span className="absolute top-1.5 left-1.5 font-mono text-[9px] font-bold bg-[#111111] text-[#F9F9F7] px-1.5 py-0.5 leading-none">
              #{index + 1}
            </span>
          </div>

          <p className="font-display font-bold text-sm leading-tight truncate text-[#111111] group-hover:text-[#CC0000] transition-colors duration-150">
            {album.name}
          </p>
          <p className="font-sans text-[11px] text-[#737373] truncate mt-0.5">
            {album.artistName}
          </p>
          <p className="font-mono text-[10px] text-[#CC0000] mt-1.5 tabular-nums font-bold">
            ~{formatNumber(album.playCount)} plays
          </p>
        </Link>
      ))}
    </div>
  );
}
