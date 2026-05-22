"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Music2,
  Lightbulb,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard",   icon: LayoutDashboard, label: "Home"     },
  { href: "/top-artists", icon: Users,            label: "Artists"  },
  { href: "/top-tracks",  icon: Music2,           label: "Tracks"   },
  { href: "/insights",    icon: Lightbulb,        label: "Insights" },
  { href: "/profile",     icon: UserCircle,       label: "Profile"  },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t-2 border-[#111111] bg-[#F9F9F7]">
      <div className="flex">
        {items.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-3 flex-1 min-h-[56px] border-r last:border-r-0 border-[#111111]/15 transition-colors duration-150",
                active
                  ? "bg-[#111111] text-[#F9F9F7]"
                  : "text-[#525252] hover:bg-[#F5F5F5] hover:text-[#111111]"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
              <span className="font-mono text-[8px] uppercase tracking-widest">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
