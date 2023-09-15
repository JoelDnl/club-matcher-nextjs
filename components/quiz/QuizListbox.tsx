import { QuizData } from "@/data/QuizData";
import QuizListboxQuestion from "./QuizListboxQuestion";

export default function QuizListbox() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {QuizData.map((item) => {
        return (
          <div key={"ques" + item.id.toString()} className="">
            <QuizListboxQuestion
              id={item.id}
              question={item.question}
              options={item.options}
            />
          </div>
        );
      })}
    </div>
  );
}
