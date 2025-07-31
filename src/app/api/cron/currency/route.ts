// /app/api/cron/currency/route.ts (Next.js 14+ API route)
import { NextResponse } from "next/server";
import { fetchExchangeRates } from "@/lib/fetchExchangeRates";

export async function GET() {
  await fetchExchangeRates();
  return NextResponse.json({ status: "success" });
}
