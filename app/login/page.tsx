import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Music2, Clock, PieChart, Disc3, TrendingUp } from "lucide-react";
import { SpotifySignInButton } from "./spotify-sign-in-button";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const features = [
    { icon: Music2,   label: "Top 50 Artists & Tracks"   },
    { icon: Clock,    label: "Listening Clock & Patterns" },
    { icon: PieChart, label: "Genre Breakdown"            },
    { icon: Disc3,    label: "Top Albums"                 },
  ];

  return (
    <div
      className="min-h-screen bg-[#F9F9F7] font-sans"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23111111' fill-opacity='0.04' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
      }}
    >

      {/* ── Newspaper masthead bar ───────────────────── */}
      <div className="border-b-4 border-[#111111]">
        <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#737373]">
            Vol. 1 · Free Edition
          </p>
          <div className="border-l border-r border-[#111111]/20 px-6">
            <p className="font-display text-xl font-black tracking-tight text-[#111111]">
              TuneStats
            </p>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#737373]">
            {today}
          </p>
        </div>
      </div>

      {/* ── Section rule ────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex items-center gap-3 py-2 border-b border-[#111111]/15">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#CC0000] font-bold">
            ◆ Breaking
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#737373]">
            Spotify Analytics · Free Access
          </span>
        </div>
      </div>

      {/* ── Main content ────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-6 py-10 sm:py-14">
        <div className="grid lg:grid-cols-12 gap-0">

          {/* ── Left: Hero headline — 8 cols ──────── */}
          <div className="lg:col-span-8 lg:border-r-2 lg:border-[#111111] lg:pr-10 pb-10 lg:pb-0">
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#CC0000] mb-5">
              ◆ Music Intelligence
            </p>

            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-[#111111]">
              Know your
              <br />
              <em className="italic">music</em>
              <br />
              inside out.
            </h1>

            <p className="font-body text-lg text-[#525252] mt-7 leading-relaxed max-w-xl">
              Deep analytics for your Spotify listening — uncover patterns,
              discover your top artists, tracks, albums, and the full story
              behind your taste.
            </p>

            {/* Ornamental divider */}
            <div className="mt-10 border-t-2 border-[#111111] pt-6">
              <p className="font-mono text-[9px] uppercase tracking-widest text-[#737373] mb-4">
                What you get
              </p>
              <div className="grid sm:grid-cols-2 border-t border-l border-[#111111]/15">
                {features.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 border-r border-b border-[#111111]/15 px-4 py-3"
                  >
                    <div className="h-7 w-7 border border-[#111111] flex items-center justify-center shrink-0">
                      <Icon className="h-3.5 w-3.5 text-[#111111]" strokeWidth={1.5} />
                    </div>
                    <span className="font-sans text-xs text-[#525252]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Sign-in — 4 cols ───────────── */}
          <div className="lg:col-span-4 lg:pl-10 flex flex-col justify-start pt-8 lg:pt-0">
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#737373] mb-5">
              Get Started — Free
            </p>

            <div className="border border-[#111111] p-6 space-y-5">
              <div className="space-y-1">
                <h2 className="font-display text-2xl font-black tracking-tight text-[#111111]">
                  Connect your account
                </h2>
                <p className="font-sans text-xs text-[#737373]">
                  Instant access. No credit card required.
                </p>
              </div>

              <SpotifySignInButton />

              <p className="font-mono text-[9px] text-[#A3A3A3] text-center leading-relaxed uppercase tracking-wider">
                Read-only · We never modify your Spotify data
              </p>
            </div>

            {/* Editorial footnote */}
            <p className="font-mono text-[9px] text-[#A3A3A3] mt-4 leading-relaxed uppercase tracking-wider border-t border-[#111111]/10 pt-4">
              TuneStats is an independent analytics tool and is not affiliated with Spotify AB.
            </p>
          </div>

        </div>
      </div>

      {/* ── Footer bar ──────────────────────────────── */}
      <div className="border-t-2 border-[#111111] mt-10">
        <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#111111]" strokeWidth={1.5} />
            <span className="font-display text-base font-black tracking-tight text-[#111111]">
              TuneStats
            </span>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#737373]">
            Spotify Analytics · Free Tier
          </p>
        </div>
      </div>

    </div>
  );
}
