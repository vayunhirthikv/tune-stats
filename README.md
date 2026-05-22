# TuneStats — Spotify Listening Stats 

A  premium web app that connects to Spotify via OAuth and surfaces deep listening statistics — top artists, tracks, albums, listening patterns, genre insights, and a shareable music personality card.

Built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Recharts**, **Auth.js**, **Prisma**, and **PostgreSQL**. Vercel-ready.

![TuneStats](https://img.shields.io/badge/Spotify-1DB954?style=flat&logo=spotify&logoColor=white)
![Next.js 15](https://img.shields.io/badge/Next.js-15-black)
<img width="2879" height="1486" alt="Screenshot 2026-05-22 130157" src="https://github.com/user-attachments/assets/ef0aa9d0-6875-4b60-b806-6d0f670893fd" />

## Free Tier Features

| Feature | Limit |
|--------|-------|
| Top Artists | 50 |
| Top Tracks | 50 |
| Top Albums | 10 (derived from top tracks) |
| Play counts | Capped at 50 (from recent activity + rank fallback) |
| Recently played | 50 tracks |
| Top genres | 10 with percentages |
| Time ranges | Spotify built-in: 4 weeks, 6 months, 1 year |
| Listening clock & day-of-week charts | From recently played |
| Shareable personality card | PNG export |

**Plus teasers** (not implemented): lifetime JSON import, unlimited albums/play counts, custom date ranges, soulmates, badges, mood scores.

## Prerequisites

- Node.js 18+
- PostgreSQL database (local, [Neon](https://neon.tech), [Supabase](https://supabase.com), or Vercel Postgres)
- [Spotify Developer](https://developer.spotify.com/dashboard) application

## Quick Start

### 1. Clone & install

```bash
cd tunestats
npm install
```

### 2. Environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `NEXTAUTH_URL` | App URL (`http://localhost:3000` in dev) |
| `NEXTAUTH_SECRET` | Random secret: `openssl rand -base64 32` |
| `SPOTIFY_CLIENT_ID` | From Spotify Dashboard |
| `SPOTIFY_CLIENT_SECRET` | From Spotify Dashboard |
| `DATABASE_URL` | PostgreSQL connection string |

### 3. Spotify app setup

1. Create an app at [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard)
2. Add redirect URI (Spotify 2025 rules — **no `localhost`**):
   ```
   http://127.0.0.1:3000/api/auth/callback/spotify
   ```
   Open the app at the same URL: `http://127.0.0.1:3000`
3. Copy Client ID and Client Secret to `.env`

### 4. Database

```bash
npx prisma db push
```

### 5. Run locally

```bash
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000) and click **Connect with Spotify**.

### Browser shows `localhost` when you type `127.0.0.1`?

**This is normal in Edge and Chrome.** They use an [address-bar alias](https://developer.chrome.com/blog/localhost-day-2023/) — the URL may *look* like `localhost` but Spotify OAuth still uses `http://127.0.0.1:3000/...` from your `.env` (`AUTH_URL`). Do not add `localhost` to the Spotify Dashboard.

If you get redirect loops, clear cookies for both `localhost` and `127.0.0.1` on port 3000, then restart `npm run dev`.

### Spotify redirect URI rules (2025)

Spotify **still allows local development**, but with stricter rules ([docs](https://developer.spotify.com/documentation/web-api/concepts/redirect_uri)):

| Allowed locally | Not allowed |
|-----------------|-------------|
| `http://127.0.0.1:3000/...` | `http://localhost:3000/...` |
| `http://[::1]:3000/...` (IPv6) | `localhost` hostname |

- **HTTP is OK** on loopback IPs; **HTTPS is required** for production URLs.
- You do **not** need to deploy just to develop — use `127.0.0.1` everywhere (browser, `.env`, Spotify Dashboard).
- **Deploy** when you want a public HTTPS URL (e.g. Vercel) for sharing or production.

## Project Structure

```
app/
  (dashboard)/
    dashboard/          # Main overview
    top-artists/        # Full 50-artist grid
    top-tracks/         # 50 tracks + recently played
    top-albums/         # Top 10 derived albums
    insights/           # Patterns, genres, fun facts
    profile/            # Share card & public profile
    artist/[id]/        # Artist detail
    track/[id]/         # Track detail
    album/[id]/         # Album detail
  login/
  api/auth/[...nextauth]/
components/
  charts/               # Recharts visualizations
  music/                # Grids & lists
  layout/               # Sidebar, header, mobile nav
lib/
  spotify/              # API client, analytics, data fetching
prisma/
  schema.prisma         # User + OAuth token storage
```

## Deploy to Vercel

1. Push the repo to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Add production redirect URI in Spotify Dashboard:  
   `https://your-domain.vercel.app/api/auth/callback/spotify`
5. Deploy — run `prisma db push` against your production DB (or use migrations)

## How Play Counts Work (Free Tier)

Spotify’s Web API does not expose exact lifetime play counts for top items. TuneStats:

1. Counts plays from your **50 most recently played** tracks
2. Falls back to a **rank-based estimate** (1–50) when a top item has no recent plays
3. **Caps all displayed counts at 50** with a clear disclaimer

For true lifetime counts, the UI teases **TuneStats Plus** (JSON history import).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run db:push` | Sync Prisma schema to DB |
| `npm run db:studio` | Open Prisma Studio |

## Tech Stack

- **Framework:** Next.js 15 App Router
- **Auth:** Auth.js v5 (next-auth) + Spotify provider
- **DB:** Prisma + PostgreSQL
- **UI:** Tailwind CSS, shadcn/ui, Radix, Lucide
- **Charts:** Recharts
- **Export:** html-to-image for share cards

## License

MIT — Not affiliated with Spotify AB or stats.fm.
