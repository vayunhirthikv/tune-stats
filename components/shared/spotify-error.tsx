import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { SpotifyApiError } from "@/lib/spotify/client";

export function SpotifyErrorPanel({ error }: { error: unknown }) {
  const is403 =
    error instanceof SpotifyApiError && error.status === 403;
  const message =
    error instanceof Error ? error.message : "Unknown error";

  return (
    <Card className="border-destructive/40 bg-destructive/5 max-w-lg mx-auto mt-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          Could not load Spotify data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {is403 ? (
          <>
            <p>
              Spotify returned <strong>403 Forbidden</strong>. In Development
              Mode, add your Spotify account email here:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>
                <a
                  href="https://developer.spotify.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Spotify Developer Dashboard
                </a>
              </li>
              <li>Your app → Settings → User Management</li>
              <li>Add your Spotify email → Save</li>
              <li>Sign out and sign in again here</li>
            </ol>
          </>
        ) : (
          <p className="text-muted-foreground break-all">{message}</p>
        )}
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/login">Back to login</Link>
          </Button>
          <form action="/api/auth/signout" method="POST">
            <Button type="submit" variant="secondary">
              Sign out
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
