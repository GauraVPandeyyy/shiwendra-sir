import { NextResponse } from "next/server";
import { getLiveSocialFeed } from "@/server/social-live";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getLiveSocialFeed();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1800",
    },
  });
}
