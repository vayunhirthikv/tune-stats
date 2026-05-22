"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import type { GenreStat } from "@/lib/spotify/types";

const COLORS = [
  "#1DB954",
  "#D4AF37",
  "#1ed760",
  "#b8860b",
  "#535353",
  "#27856a",
  "#f59e0b",
  "#6366f1",
  "#ec4899",
  "#14b8a6",
];

interface Props {
  genres: GenreStat[];
}

export function GenrePieChart({ genres }: Props) {
  const data = genres.map((g) => ({
    name: g.genre,
    value: g.percentage,
  }));

  if (data.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-12">
        No genre data available for this period.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={95}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value}%`, "Share"]}
          contentStyle={{
            background: "hsl(220 18% 10%)",
            border: "1px solid hsl(220 12% 20%)",
            borderRadius: "8px",
          }}
        />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          wrapperStyle={{ fontSize: "11px", color: "hsl(220 10% 55%)" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
