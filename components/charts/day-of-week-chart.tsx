"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { ListeningPatterns } from "@/lib/spotify/types";

interface Props {
  data: ListeningPatterns["byDay"];
  mostActiveDay: string;
}

export function DayOfWeekChart({ data, mostActiveDay }: Props) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="day"
          tick={{ fill: "hsl(220 10% 55%)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "hsl(220 10% 55%)", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            background: "hsl(220 18% 10%)",
            border: "1px solid hsl(220 12% 20%)",
            borderRadius: "8px",
          }}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {data.map((entry) => (
            <Cell
              key={entry.day}
              fill={
                entry.day === mostActiveDay
                  ? "#D4AF37"
                  : "hsl(220 12% 28%)"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
