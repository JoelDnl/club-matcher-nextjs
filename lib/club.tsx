import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Club {
  name: string;
  email: string | null;
  storefront: string;
  westernlink: string;
  description: string;
  tag: string;
  quiz: number[];
}

export interface ClubWithScore extends Club {
  matchScore: number;
}

export const NULL_CLUB: Club = {
  name: "",
  email: null,
  storefront: "",
  westernlink: "",
  description: "",
  tag: "",
  quiz: [],
};

export const NULL_CLUB_WITH_SCORE: ClubWithScore = {
  name: "",
  email: null,
  storefront: "",
  westernlink: "",
  description: "",
  tag: "",
  quiz: [],
  matchScore: 0,
};

export const MAX_DESCRIPTION_LENGTH: number = 300;

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

export async function getClubByEmail(data: any) {
  const docRef = query(collection(db, "clubs"), where("email", "==", data));
  const docSnap = await getDocs(docRef);

  return { data: docSnap.docs[0].data() };
}

export async function createClub({ data }: { data: Club }) {
  try {
    await addDoc(collection(db, "clubs"), data);
  } catch (err) {
    throw err;
  }
}

export async function updateClub({ data }: { data: Club }) {
  const docQuery = query(
    collection(db, "clubs"),
    where("email", "==", data.email)
  );
  const docSnap = await getDocs(docQuery);

  try {
    const docRef = doc(db, "clubs", docSnap.docs[0].id);
    await updateDoc(docRef, {
      name: data.name,
      description: data.description,
      tag: data.tag,
      storefront: data.storefront,
      westernlink: data.westernlink,
    });
  } catch (err) {
    throw err;
  }
}

export async function updateClubQuiz({
  data,
  email,
}: {
  data: number[];
  email: string | null;
}) {
  const docQuery = query(collection(db, "clubs"), where("email", "==", email));
  const docSnap = await getDocs(docQuery);

  try {
    const docRef = doc(db, "clubs", docSnap.docs[0].id);
    await updateDoc(docRef, {
      quiz: data,
    });
  } catch (err) {
    throw err;
  }
}

export function formatFirestoreClub(docData: DocumentData) {
  let clubData: Club = NULL_CLUB;

  clubData.name = docData["name"];
  clubData.email = docData["email"];
  clubData.storefront = docData["storefront"];
  clubData.westernlink = docData["westernlink"];
  clubData.description = docData["description"];
  clubData.tag = docData["tag"];
  clubData.quiz = docData["quiz"];

  return clubData;
}
