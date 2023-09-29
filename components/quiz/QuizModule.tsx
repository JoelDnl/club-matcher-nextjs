import { QuizData } from "@/data/QuizData";
import QuizModuleModal from "@/components/quiz/QuizModuleModal";

export default function QuizModule({ type }: { type: "register" | "profile" }) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 mb-5 sm:mb-4 ${
        type === "profile" ? "sm:px-8" : ""
      }`}
    >
      {QuizData.map((item) => {
        return (
          <div key={"ques" + item.id.toString()}>
            <QuizModuleModal
              id={item.id}
              question={item.question}
              options={item.options}
              type={type}
            />
          </div>
        );
      })}
    </div>
  );
}
