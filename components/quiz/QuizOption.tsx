import { QuizData } from "@/data/QuizData";

export default function QuizOption({
  quesId,
  optId,
  option,
}: {
  quesId: number;
  optId: number;
  option: string;
}) {
  const handleSelect = () => {
    // get the element by id and use scrollIntoView
    const elem =
      quesId == QuizData.length
        ? document.getElementById("btnFindMatch")
        : document.getElementById("ques" + (quesId + 1).toString());
    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div
      id={"q" + quesId.toString() + "-" + optId.toString()}
      onClick={handleSelect}
      className="bg-gray text-black border-2 border-gray hover:border-western hover:text-western flex flex-col text-center justify-center rounded p-8 space-y-4 h-28 sm:h-48 cursor-pointer transition-colors"
    >
      {option}
    </div>
  );
}
