import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data: string = await request.json();

  const docRef = doc(db, "clubs", data);
  const docSnap = await getDoc(docRef);

  let clubData = {};
  if (docSnap.exists()) {
    clubData = docSnap.data();
  }

  return NextResponse.json({ data: clubData });
}
