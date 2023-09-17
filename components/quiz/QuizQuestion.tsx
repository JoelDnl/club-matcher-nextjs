import React, { useEffect, useState } from "react";
import QuizOption from "./QuizOption";
import { useQuizContext } from "@/context/QuizContext";

export default function QuizQuestion({
  id,
  question,
  options,
}: {
  id: number;
  question: string;
  options: string[];
}) {
  const { quizData, setQuizData } = useQuizContext();
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const selection = quizData;
    selection[id] = active;
    setQuizData(selection);

    for (let i = 0; i < options.length; i++) {
      if (i == active) {
        document
          .getElementById("q" + id.toString() + "-" + i.toString())
          ?.classList.add("option-active");
        document
          .getElementById("q" + id.toString() + "-" + i.toString())

          ?.classList.remove("hover:text-western");
      } else {
        document
          .getElementById("q" + id.toString() + "-" + i.toString())
          ?.classList.remove("option-active");
      }
    }
  }, [active]);

  return (
    <div
      className="flex flex-col max-w-6xl items-center text-center mx-auto px-8 gap-y-6"
      id={"Q" + id.toString()}
    >
      <h1 className="text-4xl md:text-5xl font-bold">{"Q" + id.toString()}</h1>
      <h2 className="text-xl md:text-2xl font-semibold">{question}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {options.map((opt, index) => {
          return (
            <div
              onClick={() => setActive(index)}
              key={id.toString() + "-" + index.toString()}
            >
              <QuizOption quesId={id} optId={index} option={opt} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
