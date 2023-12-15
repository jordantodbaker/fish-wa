import { NextResponse } from "next/server";

export async function GET() {
  console.log("Running cron");
  return NextResponse.json({ ok: true });
}
