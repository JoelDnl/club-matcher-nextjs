"use client";

import Image from "next/image";

import logo from "@/public/images/usc_logo.png";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import { useAuth } from "@/lib/auth";
import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";

export default function Login() {
  const router = useRouter();
  const auth = useAuth();

  const [loginLoading, setLoginLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth.user.uid) router.push("/profile");
  }, []);

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await auth.signIn(email, password).then(() => {
        toast.dismiss();
        setLoginLoading(true);
        router.push("/profile");
      });
    } catch (error) {
      toast.dismiss();
      loginErrorToast();
    }
  };

  const loginErrorToast = () => {
    toast.error("Please try again using valid credentials.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="flex flex-col min-w-screen text-center items-center md:justify-center px-8 mt-24 sm:mt-28 gap-x-8 ">
      <Image src={logo} alt="Western USC" className="m-4 w-28 sm:w-32" />
      <div className="space-y-2 items-center text-center md:items-start">
        <h1 className="text-2xl lg:text-3xl font-bold">Club Login</h1>
        <h4 className="text-base font-normal">
          Update your club&apos;s quiz profile and links.
        </h4>
        <form className="pt-4 w-full sm:w-96" onSubmit={handleLogin}>
          <input
            className="shadow appearance-none border-2 border-western border-opacity-80 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="shadow appearance-none border-2 border-western border-opacity-80 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="items-center justify-between space-y-3">
            <Button className="py-2 px-2 w-[100%]" type="submit">
              Sign In
              {loginLoading ? (
                <Spinner className="inline-flex" size={"5"} />
              ) : (
                <></>
              )}
            </Button>
            <a
              className="inline-block align-baseline font-bold text-sm text-western hover:text-black transition-colors"
              href="/register"
            >
              Not registered? Create a club profile.
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
