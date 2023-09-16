"use client";

import Image from "next/image";

import logo from "@/public/images/usc_logo.png";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import { useAuth } from "@/lib/auth";
import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import QuizRegister from "@/components/quiz/QuizRegister";
import { useQuizContext } from "@/context/QuizContext";
import { Club, createClub } from "@/lib/club";
import TagModal from "@/components/quiz/tag/TagModal";
import { tags } from "@/lib/tags";
import { errorToast } from "@/components/ui/Toast";
import { FirebaseError } from "firebase/app";

export default function Login() {
  const router = useRouter();
  const auth = useAuth();
  const { quizData, isFilled } = useQuizContext();

  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerStage, setRegisterStage] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [registerCode, setRegisterCode] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [storefront, setStorefront] = useState("");
  const [westernLink, setWesternLink] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    if (auth.user.uid) {
      router.push("/profile");
      return;
    }
  }, []);

  const handleRegister = async (e: SyntheticEvent) => {
    e.preventDefault();
    toast.dismiss();

    if (registerStage == 0) {
      if (!(email.includes("@westernusc.ca") || email.includes("@uwo.ca"))) {
        errorToast("Please register using a @westernusc.ca or @uwo.ca email.");
        return;
      }

      if (password.length < 6) {
        errorToast("Please enter a password with a minimum of 6 characters.");
        return;
      }

      if (password != passwordConfirm) {
        errorToast("The passwords you entered do not match. Please try again.");
        return;
      }

      if (registerCode != process.env.NEXT_PUBLIC_REGISTRATION_CODE) {
        errorToast("Please enter a valid registration code.");
        return;
      }

      setRegisterStage(1);
      return;
    } else if (registerStage == 1) {
      if (name.length < 3) {
        errorToast("Please enter a club name with a minimum of 3 characters.");
        return;
      }

      if (tag.length < 1) {
        errorToast("Please select a club category tag.");
        return;
      }

      if (description.length < 50) {
        errorToast(
          "Please enter a description with a minimum of 50 characters."
        );
        return;
      }

      if (description.length > 200) {
        errorToast(
          "Please enter a description with a maximum of 200 characters."
        );
        return;
      }

      setRegisterStage(2);
      return;
    } else {
      if (!isFilled()) {
        errorToast(
          "Please answer all of the questions to create your profile."
        );
        return;
      }

      try {
        await auth.signUp(email, password).then(() => {
          setRegisterLoading(true);
          const registerData: Club = {
            name: name,
            email: email,
            storefront: storefront,
            westernlink: westernLink,
            description: description,
            tag: tag,
            quiz: quizData.splice(1),
          };

          return createClub({ data: registerData }).then(() => {
            router.push("/profile");
          });
        });
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          errorToast(
            "That email already has a profile. Please try again with a different one."
          );
          setRegisterStage(0);
        }
      }

      return;
    }
  };

  return (
    <div className="flex flex-col min-w-screen text-center items-center md:justify-center px-8 mt-12 sm:mt-16 gap-x-8 ">
      <Image src={logo} alt="Western USC" className="m-4 w-24 sm:w-32" />
      <div className="space-y-2 items-center text-center md:items-start">
        <h1 className="text-2xl lg:text-3xl font-semibold">
          Club Registration
        </h1>
        <h4 className="text-base font-normal">
          Create your club&apos;s quiz profile and links.
        </h4>
        <form className="pt-4 w-full sm:w-96" onSubmit={handleRegister}>
          {registerStage == 0 ? (
            <div className="">
              <input
                className="shadow appearance-none border-2 border-western rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4"
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="shadow appearance-none border-2 border-western rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="shadow appearance-none border-2 border-western rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4"
                id="passwordConfirm"
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <input
                className="shadow appearance-none border-2 border-western rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4"
                id="registerCode"
                type="text"
                placeholder="Registration Code"
                value={registerCode}
                onChange={(e) => setRegisterCode(e.target.value)}
              />
            </div>
          ) : (
            <>
              {registerStage == 1 ? (
                <div className="">
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      className="col-span-2 shadow appearance-none border-2 border-western rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4"
                      id="name"
                      type="text"
                      placeholder="Club Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <TagModal
                      buttonClass="w-full"
                      tags={tags}
                      selected={tag}
                      setSelected={setTag}
                    />
                  </div>

                  <textarea
                    className="whitespace-normal resize-none shadow appearance-none border-2 border-western rounded w-full py-6 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4"
                    id="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <input
                    className="shadow appearance-none border-2 border-western rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4"
                    id="storefront"
                    type="text"
                    placeholder="Storefront URL"
                    value={storefront}
                    onChange={(e) => setStorefront(e.target.value)}
                  />
                  <input
                    className="shadow appearance-none border-2 border-western rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4"
                    id="westerlink"
                    type="text"
                    placeholder="WesternLink URL"
                    value={westernLink}
                    onChange={(e) => setWesternLink(e.target.value)}
                  />
                </div>
              ) : (
                <QuizRegister />
              )}
            </>
          )}

          <div className="items-center justify-between space-y-3">
            {registerStage == 0 ? (
              <Button className="py-2 px-4 w-[100%]" type="submit">
                Next <FaLongArrowAltRight className="inline-flex ml-1" />
              </Button>
            ) : (
              <>
                {registerStage == 1 ? (
                  <div className="space-x-2">
                    <span onClick={() => setRegisterStage(0)}>
                      <Button
                        className="py-2 px-4 w-[45%] sm:w-[48.5%]"
                        type="button"
                      >
                        <FaLongArrowAltLeft className="inline-flex mr-1" /> Back
                      </Button>
                    </span>
                    <Button
                      className="py-2 px-4 w-[45%] sm:w-[48.5%]"
                      type="submit"
                    >
                      Next <FaLongArrowAltRight className="inline-flex ml-1" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-x-2">
                    <span onClick={() => setRegisterStage(1)}>
                      <Button
                        className="py-2 px-4 w-[45%] sm:w-[48.5%]"
                        type="button"
                      >
                        <FaLongArrowAltLeft className="inline-flex mr-1" /> Back
                      </Button>
                    </span>
                    <Button
                      className="py-2 px-4 w-[45%] sm:w-[48.5%]"
                      type="submit"
                    >
                      Register
                      {registerLoading ? (
                        <Spinner className="" size={"4"} />
                      ) : (
                        <></>
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}

            <a
              className="inline-block align-baseline font-bold text-sm text-western hover:text-black transition-colors"
              href="/login"
            >
              Already have a profile? Login here.
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
