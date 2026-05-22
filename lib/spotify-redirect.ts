/** Exact redirect URI — must match Spotify Developer Dashboard entry */
export function getSpotifyRedirectUri(): string {
  const base = (process.env.AUTH_URL ?? process.env.NEXTAUTH_URL ?? "http://127.0.0.1:3000").replace(
    /\/$/,
    ""
  );
  return `${base}/api/auth/callback/spotify`;
}
