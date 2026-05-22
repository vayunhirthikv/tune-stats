import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  accent?: "spotify" | "gold" | "default";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = "default",
}: StatCardProps) {
  return (
    <div className="border border-[#111111] bg-[#F9F9F7] p-5 hard-shadow-hover group">
      {/* Label + icon row */}
      <div className="flex items-start justify-between mb-5">
        <p className="font-mono text-[9px] uppercase tracking-widest text-[#737373]">
          {title}
        </p>
        {/* Icon box — inverts on hover */}
        <div className="h-9 w-9 border border-[#111111] flex items-center justify-center shrink-0 group-hover:bg-[#111111] group-hover:text-[#F9F9F7] transition-all duration-200">
          <Icon className="h-4 w-4" strokeWidth={1.5} />
        </div>
      </div>

      {/* Value — monospace, large */}
      <div
        className={cn(
          "font-mono text-3xl font-bold tracking-tight tabular-nums",
          accent === "spotify"
            ? "text-[#1DB954]"
            : accent === "gold"
              ? "text-[#CC0000]"   // map gold→editorial red in newsprint
              : "text-[#111111]"
        )}
      >
        {value}
      </div>

      {subtitle && (
        <p className="font-sans text-[11px] text-[#737373] mt-2 leading-snug">
          {subtitle}
        </p>
      )}
    </div>
  );
}
