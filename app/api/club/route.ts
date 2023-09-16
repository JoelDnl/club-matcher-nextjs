import { getClub } from "@/lib/club";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  const clubData = getClub(data);

  return NextResponse.json({ data: clubData });
}
