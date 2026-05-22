import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header skeleton */}
      <div className="border-b-4 border-[#111111] pb-4 mb-8">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#111111]/10">
          <Skeleton className="h-2.5 w-56" />
          <Skeleton className="h-7 w-7" />
        </div>
        <Skeleton className="h-12 w-64 mt-2" />
        <Skeleton className="h-2.5 w-48 mt-3" />
      </div>

      {/* Profile skeleton */}
      <div className="border border-[#111111] p-6 flex items-start gap-6">
        <Skeleton className="h-24 w-24 shrink-0" />
        <div className="space-y-3 flex-1 pt-1">
          <Skeleton className="h-2.5 w-28" />
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-2.5 w-44" />
        </div>
      </div>

      {/* Stat cards — collapsed grid */}
      <div className="border border-[#111111] grid grid-cols-1 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-5 border-b sm:border-b-0 sm:border-r last:border-r-0 border-[#111111] space-y-4">
            <div className="flex items-start justify-between">
              <Skeleton className="h-2.5 w-28" />
              <Skeleton className="h-9 w-9" />
            </div>
            <Skeleton className="h-8 w-28" />
          </div>
        ))}
      </div>

      {/* Artist grid skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-36" />
        <div className="border-t border-l border-[#111111] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="border-r border-b border-[#111111] p-3 space-y-2">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-3.5 w-3/4" />
              <Skeleton className="h-2.5 w-1/2" />
            </div>
          ))}
        </div>
      </div>

      {/* Track list skeleton */}
      <div className="border border-[#111111]">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-4 py-3 border-b last:border-b-0 border-[#111111]/10"
          >
            <Skeleton className="h-3 w-6 shrink-0" />
            <Skeleton className="h-11 w-11 shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-52" />
              <Skeleton className="h-2.5 w-36" />
            </div>
            <Skeleton className="h-3 w-10 shrink-0" />
          </div>
        ))}
      </div>

    </div>
  );
}
