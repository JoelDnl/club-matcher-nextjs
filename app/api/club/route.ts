import { NULL_CLUB, getClubByEmail } from "@/lib/club";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  if (data == undefined) return NextResponse.json({ data: NULL_CLUB });
  const clubData = await getClubByEmail(data);

  return NextResponse.json({ data: clubData.data });
}
