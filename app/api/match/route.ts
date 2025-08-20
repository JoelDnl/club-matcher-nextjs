import { db } from "@/lib/firebase";
import { manhattanSimilarityWeighted, QUIZ_WEIGHTS } from "@/lib/utils";
import { collection, getDocs, query } from "firebase/firestore";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { NULL_CLUB_WITH_SCORE, getClub } from "@/lib/club";

export async function POST(request: Request) {
  console.log('HIT POST /api/match');
  const data: number[] = await request.json();

  console.log('DEBUG answers:', data, 'len=', Array.isArray(data) ? data.length : 'NA');

  let clubs: any[] = [];

  let q = query(collection(db, "clubs"));
  let snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    clubs.push({ id: doc.id, ...doc.data() });
  });
  
  console.log('DEBUG clubs length:', clubs.length);
  
  const validClubs = clubs.filter(
    (c: any) => Array.isArray(c.quiz) && c.quiz.length === data.length
  );
  console.log(
    'DEBUG valid clubs with quiz:',
    validClubs.length,
    '/ total',
    clubs.length
  );

  // Q8 is the last answer in `data` array (index 7 if 0-indexed)
  const mustBeAccessible = Boolean(data[7] === 1); // adjust if "yes" is coded differently

  // Filter out clubs that aren't accessible when the user requires it
  const pool = validClubs.filter(
    (c: any) => !mustBeAccessible || c.accessible === true
  );

  console.log('DEBUG pool after accessibility filter:', pool.length, '/ total valid', validClubs.length);

  let similarities: { email: string; matchScore: number }[] = [];

  const source = pool.length ? pool : validClubs; // use filtered set if any remain
  source.forEach((club) => {
    const quizClub = (club.quiz ?? []).map(Number);
    const score = manhattanSimilarityWeighted(data.map(Number), quizClub, QUIZ_WEIGHTS);
    similarities.push({
      email: String(club.email ?? ""),
      matchScore: Number.isFinite(score) ? score : 0, // keep in 0..1
    });
  });

  console.log(
    "DEBUG sample scores (first 10):",
    similarities.slice(0, 10).map((s) => s.matchScore)
  );
  console.log("DEBUG unique score count:", new Set(similarities.map((s) => s.matchScore)).size);

  let sortedSimilarities = similarities.sort((a, b) => b.matchScore - a.matchScore);

  // Prepare top 3 (+ percent for UI)
  const top3 = sortedSimilarities.slice(0, 3).map((s) => ({
    ...s,
    matchPercent: Math.round(s.matchScore * 100),
  }));

  console.log("DEBUG top 5:", sortedSimilarities.slice(0, 5));

  cookies().set("club1", JSON.stringify(top3[0]), {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });
  cookies().set("club2", JSON.stringify(top3[1]), {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });
  cookies().set("club3", JSON.stringify(top3[2]), {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.json({ data: top3 }, { headers: { "Cache-Control": "no-store" } });
}

export async function GET() {
  console.log('HIT GET /api/match');

  if (
    !cookies().has("club1") ||
    !cookies().has("club2") ||
    !cookies().has("club3")
  )
    return NextResponse.json({ data: ["club1", "club2", "club3"] }, {
      headers: { "Cache-Control": "no-store" },
    });

  const club1 = await getClub(JSON.stringify(cookies().get("club1")));
  const club2 = await getClub(JSON.stringify(cookies().get("club2")));
  const club3 = await getClub(JSON.stringify(cookies().get("club3")));

  return NextResponse.json({ data: [club1, club2, club3] });
}
