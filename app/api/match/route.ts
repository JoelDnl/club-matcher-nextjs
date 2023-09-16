import { db } from "@/lib/firebase";
import { cosineSimilarity } from "@/lib/math";
import { collection, getDocs, query } from "firebase/firestore";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { NULL_CLUB_WITH_SCORE, getClub } from "@/lib/club";

export async function POST(request: Request) {
  const data: number[] = await request.json();
  let clubs: any[] = [];

  let q = query(collection(db, "clubs"));
  let snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    clubs.push({ id: doc.id, ...doc.data() });
  });

  let similarities: [{ email: string; matchScore: number }] = [
    { email: "", matchScore: 0 },
  ];
  similarities.pop();

  clubs.forEach((club, index) => {
    const quizClub = club["quiz"];
    const matchScore = cosineSimilarity(data, quizClub);

    similarities.push({ email: club["email"], matchScore: matchScore });
  });

  let sortedSimilarities = similarities.sort((s1, s2) =>
    s1.matchScore < s2.matchScore ? 1 : s1.matchScore > s2.matchScore ? -1 : 0
  );

  cookies().set("club1", JSON.stringify(sortedSimilarities.at(0)), {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });

  cookies().set("club2", JSON.stringify(sortedSimilarities.at(1)), {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });

  cookies().set("club3", JSON.stringify(sortedSimilarities.at(2)), {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.json({ data: sortedSimilarities.slice(0, 3) });
}

export async function GET() {
  if (
    !cookies().has("club1") ||
    !cookies().has("club2") ||
    !cookies().has("club3")
  )
    return NextResponse.json({ data: NULL_CLUB_WITH_SCORE });

  const club1 = await getClub(JSON.stringify(cookies().get("club1")));
  const club2 = await getClub(JSON.stringify(cookies().get("club2")));
  const club3 = await getClub(JSON.stringify(cookies().get("club3")));

  return NextResponse.json({ data: [club1, club2, club3] });
}
