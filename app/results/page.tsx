"use client";

import ResultsTabGroup from "@/components/results/ResultsTabGroup";
import { NULL_CLUB_WITH_SCORE } from "@/lib/club";
import { getDomainURL } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

export default function Results() {
  const [similarClubs, setSimilarClubs] = useState([NULL_CLUB_WITH_SCORE]);
  const [filled, setFilled] = useState(true);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();

  type ClubLite = {
    name?: string;
    email?: string;
    tag?: string;
    westernlink?: string;
    description?: string;
  };
  
  const [exploreByTag, setExploreByTag] = useState<Record<string, ClubLite[]>>({});
  const [culturalClubs, setCulturalClubs] = useState<ClubLite[]>([]);

  const [openTag, setOpenTag] = useState<string | null>(null);

  const CULTURAL_TAGS = new Set([
    "culture",
    "cultural",
    "cultural club",
    "cultural & identity",
    "identity",
  ]);

  function handleTagClick(tag?: string) {
    const t = (tag ?? "").trim().toLowerCase();
    if (!t) return;
    setOpenTag(t);
    setTimeout(() => {
      document.getElementById("explore-by-category")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  async function fetchSimilarClubs() {
    const domainURL = getDomainURL(window.location.href);
    const baseURL = `https://${domainURL}`;

    const res = await fetch(
      `${
        domainURL == "localhost" ? "http://localhost:3000" : baseURL
      }/api/match`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();

    setFilled(
      JSON.stringify(result.data) === JSON.stringify(NULL_CLUB_WITH_SCORE)
        ? false
        : true
    );
    setSimilarClubs(result.data);

    return result.data;
  }

  async function fetchByTag(tag: string, k = 8) {
    const res = await fetch(`/api/explore?tag=${encodeURIComponent(tag)}&k=${k}`, {
      cache: "no-store",
    });
    const json = await res.json();
    return (json.data ?? []) as ClubLite[];
  }

  async function fetchCultural(k = 12) {
    const res = await fetch(`/api/explore?culturalOnly=true&k=${k}`, {
      cache: "no-store",
    });
    const json = await res.json();
    return (json.data ?? []) as ClubLite[];
  }


  useEffect(() => {
    (async () => {
      const similarities = await fetchSimilarClubs().then(() => {
        if (!filled) {
          push("/quiz");
          return;
        }
      });

      setLoading(false);
    })();

    return () => {};
  }, []);

  useEffect(() => {
    if (loading) return;
  
    // collect unique tags from the recommended clubs
    const tags = Array.from(
      new Set(
        (similarClubs as any[])
          .map((c) => String(c?.tag ?? "").trim().toLowerCase())
          .filter(Boolean)
      )
    );
  
    (async () => {
      // prefetch lists for the tags we actually have
      const map: Record<string, ClubLite[]> = {};
      for (const t of tags) {
        map[t] = await fetchByTag(t, 8);
      }
      setExploreByTag(map);
  
      // show “cultural clubs” only if at least one top club is cultural
      if (tags.some((t) => CULTURAL_TAGS.has(t))) {
        setCulturalClubs(await fetchCultural(12));
      } else {
        setCulturalClubs([]); // hide the section
      }
    })();
  }, [loading, similarClubs]);

  return (
    <main className="justify-center text-center mt-6">
      <div>
        <h1 className="justify-center items-center text-5xl font-bold text-black hidden sm:inline-flex">
          Your results are in
          <Typewriter
            options={{
              strings: ["..."],
              autoStart: true,
              loop: true,
              cursor: "",
            }}
          />
        </h1>
        <h1 className="justify-center text-4xl font-bold text-black inline-flex sm:hidden">
          Your results:
        </h1>
        <ResultsTabGroup loading={loading} data={similarClubs} onTagClick={handleTagClick}/>
        {openTag && Array.isArray(exploreByTag[openTag]) && (
          <div id="explore-by-category" className="mt-10">
            <div className="text-left text-lg font-semibold mb-3">
              More in “{openTag}”
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {exploreByTag[openTag].map((c, i) => (
                <div key={(c.email || c.name || `${openTag}-${i}`)} className="rounded-xl border p-4">
                  <div className="font-medium">{c.name || c.email}</div>
                  {c.description && (
                    <p className="mt-1 text-sm text-gray-600 line-clamp-3">{c.description}</p>
                  )}
                  {c.westernlink && (
                    <a
                      href={c.westernlink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-purple-700 hover:underline text-sm"
                    >
                      View on WesternLink →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {culturalClubs.length > 0 && (
          <div className="mt-10">
            <div className="text-left text-lg font-semibold mb-3">Cultural clubs at Western</div>
            <div className="flex flex-wrap gap-2">
              {culturalClubs.map((c, i) => (
                <div
                  key={(c.email || c.name || `cultural-${i}`)}
                  className="px-3 py-2 rounded-lg bg-gray-100 text-sm"
                >
                  {c.name || c.email}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
