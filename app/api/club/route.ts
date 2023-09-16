import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  const clubData = getClub(data);

  return NextResponse.json({ data: clubData });
}

export async function getClub(data: any) {
  const rawValue = JSON.parse(data)["value"];
  const docRef = query(
    collection(db, "clubs"),
    where("email", "==", JSON.parse(rawValue)["email"])
  );
  const docSnap = await getDocs(docRef);
  const clubData = {
    matchScore: JSON.parse(rawValue)["matchScore"],
    ...docSnap.docs[0].data(),
  };

  return clubData;
}
