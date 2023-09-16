"use client";

import { NULL_CLUB } from "@/lib/club";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Results() {
  const { push } = useRouter();
  const params = useSearchParams();

  const clubId = params.get("id");
  const [club, setClub] = useState(NULL_CLUB);
  const [loading, setLoading] = useState(true);

  const fetchClubData = async () => {
    const res = await fetch(`/api/club`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clubId),
    });
    const result = await res.json();
    setClub(result.data);

    return result.data;
  };

  useEffect(() => {
    if (!clubId) push("/quiz"); // if no result id, send to quiz page

    (async () => {
      const clubData = await fetchClubData();
      if (JSON.stringify(clubData) === "{}") {
        push("/quiz");
        return;
      }

      setLoading(false);
    })();

    return () => {};
  }, [clubId]);

  return (
    <main className="text-center">
      {loading ? (
        <></>
      ) : (
        <p>
          <b>ID: </b>
          {clubId}
        </p>
      )}
    </main>
  );
}
