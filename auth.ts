import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { SPOTIFY_SCOPES } from "@/lib/constants";
import { getSpotifyRedirectUri } from "@/lib/spotify-redirect";

function canonicalizeLocalAuthUrl(value?: string): string {
  const fallback = "http://127.0.0.1:3000";
  if (!value) return fallback;

  try {
    const url = new URL(value);
    if (url.hostname === "localhost") {
      url.hostname = "127.0.0.1";
      return url.toString().replace(/\/$/, "");
    }
  } catch {
    return fallback;
  }

  return value.replace(/\/$/, "");
}

const canonicalAuthUrl = canonicalizeLocalAuthUrl(
  process.env.AUTH_URL ?? process.env.NEXTAUTH_URL
);
process.env.AUTH_URL = canonicalAuthUrl;
process.env.NEXTAUTH_URL = canonicalAuthUrl;

const spotifyRedirectUri = getSpotifyRedirectUri();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  redirectProxyUrl: `${canonicalAuthUrl}/api/auth`,
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: SPOTIFY_SCOPES,
          redirect_uri: spotifyRedirectUri,
        },
      },
      token: {
        url: "https://accounts.spotify.com/api/token",
        params: {
          redirect_uri: spotifyRedirectUri,
        },
      },
    }),
  ],
  callbacks: {
    // Keep post-login redirects on the same host the browser uses (localhost or 127.0.0.1).
    // Spotify OAuth still uses AUTH_URL (127.0.0.1) for the redirect_uri sent to Spotify.
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return url;
      try {
        const target = new URL(url);
        const base = new URL(baseUrl);
        if (target.origin === base.origin) return url;
      } catch {
        /* fall through */
      }
      return "/dashboard";
    },
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "spotify" && profile && user.id) {
        const p = profile as {
          id?: string;
          display_name?: string;
          country?: string;
          product?: string;
        };
        await prisma.user
          .upsert({
            where: { id: user.id },
            update: {
              spotifyId: p.id,
              displayName: p.display_name ?? user.name,
              country: p.country,
              product: p.product,
            },
            create: {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              spotifyId: p.id,
              displayName: p.display_name ?? user.name,
              country: p.country,
              product: p.product,
            },
          })
          .catch(() => {
            /* non-fatal if DB unavailable */
          });
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  trustHost: true,
});
