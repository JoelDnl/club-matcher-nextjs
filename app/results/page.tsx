"use client";

import ResultsTabGroup from "@/components/ResultsTabGroup";
import { NULL_CLUB_WITH_SCORE } from "@/lib/club";
import { getDomainURL } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect";

export default function Results() {
  const [similarClubs, setSimilarClubs] = useState([NULL_CLUB_WITH_SCORE]);
  const [filled, setFilled] = useState(true);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();

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
    console.log(result.data);

    return result.data;
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
        <ResultsTabGroup loading={loading} data={similarClubs} />
      </div>
    </main>
  );
}
