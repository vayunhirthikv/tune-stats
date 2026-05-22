"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { TIME_RANGES } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock } from "lucide-react";

export function TimeRangeSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("range") ?? "short_term";

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={current} onValueChange={onChange}>
        <SelectTrigger className="w-[160px] bg-secondary border-border">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {TIME_RANGES.map((r) => (
            <SelectItem key={r.value} value={r.value}>
              {r.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <button
        type="button"
        title="Custom date ranges require Plus"
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition"
        onClick={() => alert("Custom date ranges are available with TuneStats Plus!")}
      >
        <Lock className="h-3 w-3" />
        Custom
      </button>
    </div>
  );
}
