"use client";

import Button from "@/components/ui/Button";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import { useQuizContext } from "@/context/QuizContext";
import { QuizData } from "@/data/QuizData";
import { useRouter } from "next/navigation";
import { errorToast } from "@/components/ui/Toast";
import { SyntheticEvent, useState } from "react";
import Spinner from "@/components/ui/Spinner";

export default function Quiz() {
  const { quizData, isFilled } = useQuizContext();
  const { push } = useRouter();

  const [matching, setMatching] = useState(false);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    if (isFilled()) {
      setMatching(true);
      const data = quizData.splice(1);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/match`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      push("/results");
      return;
    } else {
      errorToast("Please answer every question.");
      return;
    }
  }

  return (
    <main className="text-center">
      {QuizData.map((item) => {
        return (
          <div
            key={"ques" + item.id.toString()}
            id={"ques" + item.id.toString()}
            className="pt-16"
          >
            <QuizQuestion
              id={item.id}
              question={item.question}
              options={item.options}
            />
            <hr className="h-px mt-16 bg-slate-200 border-0"></hr>
          </div>
        );
      })}
      <div id="btnFindMatch" className="mt-16 mb-8">
        <form className="" onSubmit={handleSubmit}>
          <Button className="w-48" type="submit">
            Find Your Match
            {matching ? <Spinner className="" size={"5"} /> : <></>}
          </Button>
        </form>
      </div>
    </main>
  );
}
