import Image from "next/image";
import type { SpotifyUser } from "@/lib/spotify/types";
import { ExternalLink, MapPin } from "lucide-react";

export function ProfileHeader({ user }: { user: SpotifyUser }) {
  const image = user.images[0]?.url;

  return (
    <div className="border border-[#111111] newsprint-texture">
      <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6 p-6">

        {/* ── Avatar — grayscale ───────────────────── */}
        <div className="relative shrink-0">
          <div className="h-24 w-24 border-2 border-[#111111] overflow-hidden">
            {image ? (
              <Image
                src={image}
                alt={user.display_name ?? "User"}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            ) : (
              <div className="w-full h-full bg-[#E5E5E0] flex items-center justify-center font-display text-4xl text-[#111111]">
                ♪
              </div>
            )}
          </div>
          {/* Plan stamp */}
          <div className="absolute -bottom-px -right-px bg-[#111111] text-[#F9F9F7] font-mono text-[8px] px-1.5 py-0.5 uppercase tracking-widest">
            {user.product === "premium" ? "Premium" : "Free"}
          </div>
        </div>

        {/* ── Info ─────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#737373] mb-1">
            Listener Profile
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-black leading-[0.95] tracking-tight text-[#111111]">
            {user.display_name ?? "Spotify User"}
          </h2>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
            {user.country && (
              <span className="flex items-center gap-1 font-mono text-xs text-[#737373]">
                <MapPin className="h-3 w-3" strokeWidth={1.5} />
                {user.country}
              </span>
            )}
            <span className="font-mono text-xs text-[#737373]">
              Connected via Spotify
            </span>
          </div>

          <a
            href={user.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-xs text-[#111111] mt-3 border-b border-[#111111] pb-px hover:border-[#CC0000] hover:text-[#CC0000] transition-colors duration-150 group"
          >
            Open on Spotify
            <ExternalLink
              className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
