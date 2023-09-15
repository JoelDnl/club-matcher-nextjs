"use client";

import Button from "@/components/ui/Button";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import { useQuizContext } from "@/context/QuizContext";
import { QuizData } from "@/data/QuizData";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { errorToast } from "@/components/ui/Toast";

export default function Quiz() {
  const { quizData, setQuizData, isFilled } = useQuizContext();
  const { push } = useRouter();

  const handleSubmit = async () => {
    if (isFilled()) {
      const data = quizData.splice(1);

      const res = await fetch(`/api/match`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result.data);
      push(`/results?id=${result.data.id.toString()}`);
      // push("/results?id=" + id.toString()); use when the route handler outputs a club id match
    } else {
      errorToast("Please answer every question.");
      return;
    }
  };

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
        <Button className="w-48" type="button">
          <span onClick={() => handleSubmit()}>Find Your Match</span>
        </Button>
      </div>
    </main>
  );
}
