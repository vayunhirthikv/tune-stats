"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Music2,
  Disc3,
  Lightbulb,
  UserCircle,
  Crown,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard",   label: "Dashboard",   icon: LayoutDashboard },
  { href: "/top-artists", label: "Top Artists",  icon: Users },
  { href: "/top-tracks",  label: "Top Tracks",   icon: Music2 },
  { href: "/top-albums",  label: "Top Albums",   icon: Disc3 },
  { href: "/insights",    label: "Insights",     icon: Lightbulb },
  { href: "/profile",     label: "Profile",      icon: UserCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 flex-col min-h-screen border-r-2 border-[#111111] bg-[#F9F9F7]">

      {/* ── Masthead ─────────────────────────────── */}
      <div className="border-b-4 border-[#111111] p-6 newsprint-texture">
        <Link href="/dashboard" className="block relative z-10">
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#737373] mb-1.5">
            Est. {new Date().getFullYear()} · Vol. 1
          </p>
          <div className="flex items-end gap-2">
            <BarChart3 className="h-5 w-5 text-[#CC0000] shrink-0 mb-0.5" strokeWidth={1.5} />
            <h1 className="font-display text-3xl font-black leading-none tracking-tight text-[#111111]">
              TuneStats
            </h1>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#737373] mt-1.5 border-t border-[#111111]/15 pt-1.5">
            Spotify Analytics
          </p>
        </Link>
      </div>

      {/* ── Navigation ───────────────────────────── */}
      <nav className="flex-1 flex flex-col">
        <p className="font-mono text-[9px] uppercase tracking-widest text-[#737373] px-6 py-2.5 border-b border-[#111111]/10 bg-[#F5F5F5]">
          Sections
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-6 py-3.5 border-b border-[#111111]/10 transition-colors duration-150 group",
                active
                  ? "bg-[#111111] text-[#F9F9F7]"
                  : "text-[#111111] hover:bg-[#F5F5F5]"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  active ? "text-[#F9F9F7]" : "text-[#525252] group-hover:text-[#111111]"
                )}
                strokeWidth={1.5}
              />
              <span className="font-sans text-[11px] uppercase tracking-widest font-semibold">
                {label}
              </span>
              {active && (
                <span className="ml-auto w-1.5 h-1.5 bg-[#CC0000] shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Plus — inverted block ─────────────────── */}
      <div className="bg-[#111111] p-5 newsprint-texture">
        <div className="relative z-10 flex items-start gap-3">
          <div className="h-8 w-8 border border-[#CC0000] flex items-center justify-center shrink-0 mt-0.5">
            <Crown className="h-4 w-4 text-[#CC0000]" strokeWidth={1.5} />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#F9F9F7] font-bold">
              Upgrade to Plus
            </p>
            <p className="font-sans text-[11px] text-[#737373] mt-1 leading-snug">
              Full history, soulmates & more
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
