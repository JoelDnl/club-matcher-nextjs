import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const quizData: {} = await request.json();
  const data = quizData;
  try {
    await addDoc(collection(db, "clubs"), data);
  } catch (err) {
    throw err;
  }

  return NextResponse.json({ data });
}
