import { Crown, Lock, ArrowRight } from "lucide-react";

interface PlusTeaserProps {
  title: string;
  description: string;
  features?: string[];
  compact?: boolean;
}

export function PlusTeaser({
  title,
  description,
  features = [],
  compact = false,
}: PlusTeaserProps) {
  if (compact) {
    return (
      <div className="border border-[#111111] bg-[#111111] text-[#F9F9F7] p-4 flex items-center gap-4">
        <Crown className="h-5 w-5 text-[#CC0000] shrink-0" strokeWidth={1.5} />
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#F9F9F7]">
            {title}
          </p>
          <p className="font-sans text-[11px] text-[#737373] truncate mt-0.5">
            {description}
          </p>
        </div>
        <button
          disabled
          className="font-mono text-[9px] uppercase tracking-widest border border-[#F9F9F7]/20 text-[#737373] px-3 py-1.5 shrink-0 cursor-not-allowed min-h-[36px]"
        >
          Soon
        </button>
      </div>
    );
  }

  return (
    // Inverted section — black background, white text
    <div className="border-2 border-[#111111] bg-[#111111] text-[#F9F9F7] mt-6 newsprint-texture">
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-5 p-6">

        {/* Red crown box */}
        <div className="h-12 w-12 border border-[#CC0000] flex items-center justify-center shrink-0">
          <Crown className="h-6 w-6 text-[#CC0000]" strokeWidth={1.5} />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="font-display text-xl font-bold text-[#F9F9F7]">
              {title}
            </h3>
            <span className="font-mono text-[9px] uppercase tracking-widest border border-[#CC0000] text-[#CC0000] px-2 py-0.5">
              Plus
            </span>
          </div>
          <p className="font-sans text-sm text-[#A3A3A3] leading-relaxed">
            {description}
          </p>

          {features.length > 0 && (
            <ul className="mt-4 grid sm:grid-cols-2 gap-2">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 font-sans text-xs text-[#A3A3A3] border-l-2 border-[#CC0000]/50 pl-3 py-0.5"
                >
                  <Lock className="h-3 w-3 text-[#CC0000] shrink-0" strokeWidth={1.5} />
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          disabled
          className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest border border-[#F9F9F7]/20 text-[#737373] px-4 py-2.5 shrink-0 cursor-not-allowed min-h-[44px]"
        >
          Coming Soon
          <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
