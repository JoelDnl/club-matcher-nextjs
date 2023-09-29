"use client";

import ProfileTabGroup from "@/components/profile/ProfileTabGroup";
import { useProfileContext } from "@/context/ProfileContext";
import { useAuth } from "@/lib/auth";
import { Club, NULL_CLUB } from "@/lib/club";
import { getDomainURL } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const auth = useAuth();
  const { profile, setProfile } = useProfileContext();
  const { push } = useRouter();

  const [loading, setLoading] = useState(true);

  async function fetchClubData() {
    const domainURL = getDomainURL(window.location.href);
    const baseURL = `https://${domainURL}`;

    const res = await fetch(
      `${
        domainURL == "localhost" ? "http://localhost:3000" : baseURL
      }/api/club`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auth.user.email),
      }
    );
    const result = await res.json();

    const formatClub: Club = {
      email: result.data["email"],
      name: result.data["name"],
      description: result.data["description"],
      tag: result.data["tag"],
      storefront: result.data["storefront"],
      westernlink: result.data["westernlink"],
      quiz: result.data["quiz"],
    };
    setProfile(formatClub);

    return result.data;
  }

  useEffect(() => {
    (async () => {
      await fetchClubData().then(() => {
        setLoading(false);

        if (!auth.loading && !auth.user.uid) {
          push("/login");
          return;
        }
      });
    })();

    return () => {};
  }, [auth.loading]);

  return (
    <main className="">
      <div className="flex lg:h-full justify-center items-center w-11/12 sm:max-w-6xl mx-auto">
        <ProfileTabGroup loading={loading} data={profile} />
      </div>
    </main>
  );
}
