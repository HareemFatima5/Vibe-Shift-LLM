// app/api/history/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getTransformations } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const history = getTransformations();
    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}