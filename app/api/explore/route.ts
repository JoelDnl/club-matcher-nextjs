// app/api/explore/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query } from "firebase/firestore";

// Define which tags count as "cultural"
const CULTURAL_TAGS = new Set(["culture", "cultural", "cultural-club", "cultural & identity"]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = (searchParams.get("tag") || "").trim().toLowerCase();
  const k = Number(searchParams.get("k") ?? 12);
  const culturalOnly = (searchParams.get("culturalOnly") || "false").toLowerCase() === "true";
  const excludeCultural = (searchParams.get("excludeCultural") || "false").toLowerCase() === "true";

  const snap = await getDocs(query(collection(db, "clubs")));
  const clubs = snap.docs.map((d) => ({ id: d.id, ...d.data() } as any));

  // Normalize helper
  const norm = (s: any) => String(s || "").trim().toLowerCase();

  let filtered = clubs;

  if (tag) {
    filtered = filtered.filter((c) => norm(c.tag) === tag);
  }

  if (culturalOnly) {
    filtered = filtered.filter((c) => CULTURAL_TAGS.has(norm(c.tag)));
  }

  if (excludeCultural) {
    filtered = filtered.filter((c) => !CULTURAL_TAGS.has(norm(c.tag)));
  }

  // Basic shape back to client
  const data = filtered.slice(0, k).map((c) => ({
    id: c.id,
    name: c.name ?? "",
    email: c.email ?? "",
    tag: c.tag ?? "",
    description: c.description ?? "",
    storefront: c.storefront ?? "",
    westernlink: c.westernlink ?? "",
  }));

  return NextResponse.json({ data }, { headers: { "Cache-Control": "no-store" } });
}
