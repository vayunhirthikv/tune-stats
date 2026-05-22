/** Canonical app URL — Spotify requires 127.0.0.1, not localhost */
export function getAppOrigin(): string {
  const raw = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
  if (raw) {
    return new URL(raw).origin;
  }
  return "http://127.0.0.1:3000";
}

/** Rewrite localhost → 127.0.0.1 so Spotify callbacks stay valid */
export function normalizeToLoopback(url: string): string {
  return url.replace(/:\/\/localhost(?=[:/])/gi, "://127.0.0.1");
}

export function appUrl(path = ""): string {
  const base = getAppOrigin();
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}
