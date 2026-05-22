import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TimeRangeSelect } from "@/components/shared/time-range-select";
import { LogOut } from "lucide-react";
import { Suspense } from "react";

interface HeaderProps {
  title: string;
  description?: string;
  showTimeRange?: boolean;
}

export async function Header({
  title,
  description,
  showTimeRange = true,
}: HeaderProps) {
  const session = await auth();
  const user = session?.user;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="border-b-4 border-[#111111] mb-8 pb-4">
      {/* Edition metadata row */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#111111]/10">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#737373]">
          {today}
        </p>
        {user && (
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7 border border-[#111111]" style={{ borderRadius: 0 }}>
              <AvatarImage src={user.image ?? undefined} alt={user.name ?? ""} />
              <AvatarFallback
                className="font-mono text-[10px] bg-[#E5E5E0] text-[#111111]"
                style={{ borderRadius: 0 }}
              >
                {user.name?.charAt(0) ?? "U"}
              </AvatarFallback>
            </Avatar>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                title="Sign out"
                className="h-7 w-7 text-[#525252] hover:text-[#111111]"
              >
                <LogOut className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Button>
            </form>
          </div>
        )}
      </div>

      {/* Title + controls row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-[0.95] text-[#111111]">
            {title}
          </h1>
          {description && (
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#737373] mt-2">
              {description}
            </p>
          )}
        </div>
        {showTimeRange && (
          <Suspense fallback={<div className="h-9 w-36 bg-[#E5E5E0]" />}>
            <TimeRangeSelect />
          </Suspense>
        )}
      </div>
    </header>
  );
}
