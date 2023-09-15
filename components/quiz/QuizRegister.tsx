import { QuizData } from "@/data/QuizData";
import QuizRegisterModal from "./QuizRegisterModal";

export default function QuizRegister() {
  return (
    <div className="grid grid-cols-2 gap-3 mb-5 sm:mb-4">
      {QuizData.map((item) => {
        return (
          <div key={"ques" + item.id.toString()}>
            <QuizRegisterModal
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
