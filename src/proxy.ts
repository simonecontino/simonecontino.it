import { NextResponse, type NextRequest } from "next/server";
import { features } from "@/config/features";

// Block before streaming starts: notFound() in streamed metadata can otherwise
// return a soft 404 (HTTP 200). Preserve the site's standard 404 presentation.
export function proxy(request: NextRequest) {
  if (!features.articlesEnabled) {
    return NextResponse.rewrite(new URL("/_not-found", request.url), {
      status: 404, headers: { "X-Robots-Tag": "noindex", "Cache-Control": "no-store" },
    });
  }
  return NextResponse.next();
}

export const config = { matcher: ["/articoli/:path*"] };
