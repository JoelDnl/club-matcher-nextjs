import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { formatFirestoreClub } from "@/lib/club";

export async function POST(request: Request) {
  const { tag } = await request.json();
  if (!tag) {
    return NextResponse.json({ data: [] });
  }

  const q = query(collection(db, "clubs"), where("tag", "==", tag));
  const snapshot = await getDocs(q);
  const clubs = snapshot.docs.map((doc) => formatFirestoreClub(doc.data()));

  return NextResponse.json({ data: clubs });
}