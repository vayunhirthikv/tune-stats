import type { TimeRange } from "@/lib/constants";

export function getTimeRangeFromSearch(
  value: string | string[] | undefined
): TimeRange {
  const v = Array.isArray(value) ? value[0] : value;
  if (v === "medium_term" || v === "long_term") return v;
  return "short_term";
}
