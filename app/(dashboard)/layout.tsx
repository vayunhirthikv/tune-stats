import { auth } from "@/auth";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
          <Suspense fallback={null}>{children}</Suspense>
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
