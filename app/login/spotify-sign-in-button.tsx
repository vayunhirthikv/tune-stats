"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function SpotifySignInButton() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn("spotify", { redirectTo: "/dashboard" });
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={loading}
      className="
        group relative w-full flex items-center justify-center gap-3
        bg-[#111111] text-[#F9F9F7]
        border border-[#111111]
        font-sans font-semibold text-xs uppercase tracking-widest
        px-6 py-4 min-h-[52px]
        transition-all duration-200 ease-out
        hover:bg-[#F9F9F7] hover:text-[#111111]
        disabled:opacity-50 disabled:cursor-not-allowed
        overflow-hidden
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F9F7]
      "
    >
      {/* Shimmer sweep on hover */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden
      />

      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin shrink-0" />
      ) : (
        <svg
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 01-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 01.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.975-.519.781.781 0 01.52-.975c3.632-1.102 8.147-.568 11.234 1.331a.78.78 0 01.258 1.072zm.105-2.835c-3.223-1.914-8.54-2.09-11.618-1.156a.935.935 0 11-.543-1.79c3.533-1.073 9.404-.866 13.115 1.338a.935.935 0 01-.954 1.608z" />
        </svg>
      )}

      <span className="relative">
        {loading ? "Connecting…" : "Continue with Spotify"}
      </span>
    </button>
  );
}
