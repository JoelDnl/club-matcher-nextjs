import { DocumentData, addDoc, collection } from "firebase/firestore";
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

export const NULL_CLUB: Club = {
  name: "",
  email: null,
  storefront: "",
  westernlink: "",
  description: "",
  tag: "",
  quiz: [],
};

export async function createClub({ data }: { data: Club }) {
  try {
    await addDoc(collection(db, "clubs"), data);
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
