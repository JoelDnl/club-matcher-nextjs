"use client";

import Card from "@/components/ui/Card";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const auth = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (!auth.user.uid) {
      push("/login");
      return;
    }
  }, [auth.user.uid]);

  return (
    <main className="px-8 w-11/12 sm:max-w-6xl mx-auto my-4">
      <div className="">
        <h2 className="text-2xl lg:text-3xl font-semibold">Your Profile</h2>
        <div className="grid grid-cols-5 gap-4 my-4">
          <Card className="col-span-2 rounded">
            <h3 className="text-xl lg:text-2xl font-semibold">Club Name</h3>
          </Card>
          <Card className="col-span-3 rounded">
            <h3 className="text-xl lg:text-2xl font-semibold">
              Club Description
            </h3>
          </Card>
        </div>
      </div>
    </main>
  );
}
