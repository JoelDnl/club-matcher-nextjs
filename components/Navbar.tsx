"use client";

import { Disclosure } from "@headlessui/react";
import Image from "next/image";

import logo from "@/public/images/usc_logo.png";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const auth = useAuth();
  const { push } = useRouter();

  function handleSignOut() {
    auth.signOut();
    push("/login");
    return;
  }

  return (
    <Disclosure as="nav" className="bg-white">
      <div className="mx-auto w-11/12 md:max-w-6xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-24 items-center justify-between">
          <div className="flex flex-1 items-center sm:items-stretch sm:justify-start px-2 sm:px-0">
            <div className="flex flex-shrink-0 items-center">
              <a className="focus:outline-none" type="button" href="/">
                <Image
                  className="h-12 md:h-16 w-auto"
                  src={logo}
                  alt="Western USC"
                />
              </a>
            </div>
          </div>
          {!auth.loading ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {auth.user.uid ? (
                <div className="inline-flex gap-2 sm:gap-4">
                  <a
                    href="/profile"
                    className="bg-white border-2 border-black text-black hover:bg-black hover:text-white rounded px-2 py-1 text-base font-semibold transition-colors cursor-pointer fade-in"
                  >
                    Profile
                  </a>
                  <div
                    onClick={handleSignOut}
                    className="bg-white border-2 border-black text-black hover:bg-black hover:text-white rounded px-2 py-1 text-base font-semibold transition-colors cursor-pointer fade-in"
                  >
                    Logout
                  </div>
                </div>
              ) : (
                <a
                  href="/login"
                  className="bg-white border-2 border-black text-black hover:bg-black hover:text-white rounded px-2 py-1 text-base font-semibold transition-colors fade-in"
                >
                  Club Login
                </a>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Disclosure>
  );
}
