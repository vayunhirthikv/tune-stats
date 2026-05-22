import type { Metadata } from "next";
import { Playfair_Display, Lora, Inter, JetBrains_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
});

const bodyFont = Lora({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "TuneStats — Spotify Listening Stats",
  description:
    "Deep analytics for your Spotify history. Top artists, tracks, listening patterns, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${sansFont.variable} ${monoFont.variable} font-sans`}
      >
        <NextTopLoader
          color="#CC0000"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #CC0000,0 0 5px #CC0000"
        />
        {children}
      </body>
    </html>
  );
}
