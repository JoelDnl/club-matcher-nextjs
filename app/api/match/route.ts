import { useQuizContext } from "@/context/QuizContext";
import { db } from "@/lib/firebase";
import { cosineSimilarity } from "@/lib/math";
import { collection, getDocs, query } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data: number[] = await request.json();
  let clubs: any[] = [];

  let q = query(collection(db, "clubs"));
  let snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    clubs.push({ id: doc.id, ...doc.data() });
  });

  let bestMatchScore = 0.0,
    bestMatchIndex = 0;
  clubs.forEach((club, index) => {
    const quizClub = club["quiz"];
    let matchScore = cosineSimilarity(data, quizClub);
    console.log(index, matchScore);
    if (matchScore > bestMatchScore) {
      bestMatchIndex = index;
      bestMatchScore = matchScore;
    }
  });

  return NextResponse.json({ data: clubs[bestMatchIndex] });
}
