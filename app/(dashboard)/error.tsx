"use client";

import { useEffect } from "react";
import { SpotifyErrorPanel } from "@/components/shared/spotify-error";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="py-8">
      <SpotifyErrorPanel error={error} />
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={reset}
          className="text-sm text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
