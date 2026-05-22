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
  data: ListeningPatterns["byHour"];
  mostActiveHour: number;
}

export function ListeningClockChart({ data, mostActiveHour }: Props) {
  const chartData = data.map((d) => ({
    label: d.hour === 0 ? "12a" : d.hour < 12 ? `${d.hour}a` : d.hour === 12 ? "12p" : `${d.hour - 12}p`,
    count: d.count,
    hour: d.hour,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="label"
          tick={{ fill: "hsl(220 10% 55%)", fontSize: 10 }}
          interval={2}
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
          labelFormatter={(_, payload) => {
            const h = payload?.[0]?.payload?.hour;
            if (h === undefined) return "";
            const period = h >= 12 ? "PM" : "AM";
            const hour = h % 12 || 12;
            return `${hour}:00 ${period}`;
          }}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {chartData.map((entry) => (
            <Cell
              key={entry.hour}
              fill={
                entry.hour === mostActiveHour
                  ? "#1DB954"
                  : "hsl(220 12% 28%)"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
