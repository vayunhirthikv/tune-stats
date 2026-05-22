"use client";

import type { GenreStat } from "@/lib/spotify/types";

export function GenreBarList({ genres }: { genres: GenreStat[] }) {
  const max = genres[0]?.percentage ?? 100;

  return (
    <ul className="space-y-3">
      {genres.map((g, i) => (
        <li key={g.genre}>
          <div className="flex justify-between text-sm mb-1">
            <span className="flex items-center gap-2">
              <span className="text-muted-foreground w-5">{i + 1}</span>
              {g.genre}
            </span>
            <span className="text-muted-foreground tabular-nums">
              {g.percentage}% · {g.count}
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-spotify to-primary/80 transition-all duration-700"
              style={{ width: `${(g.percentage / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
