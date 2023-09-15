import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useQuizContext } from "@/context/QuizContext";

export default function QuizRegisterRadio({
  id,
  options,
}: {
  id: number;
  options: string[];
}) {
  const { quizData, setQuizData } = useQuizContext();
  const [selected, setSelected] = useState(options[quizData[id]]);

  useEffect(() => {
    let newData = quizData;
    newData[id] = options.indexOf(selected);
    setQuizData(newData);
  }, [selected]);

  return (
    <div className="w-full py-2">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={setSelected}>
          <div
            className={`${
              options.length > 6 ? "grid grid-cols-2 gap-2" : "space-y-2"
            }`}
          >
            {options.map((option, index) => (
              <RadioGroup.Option
                key={"option-" + index}
                value={option}
                className={({ active, checked }) =>
                  `
                  ${checked ? "bg-western text-white" : "bg-gray"}
                    relative flex cursor-pointer rounded px-4 py-2 border-2 border-gray_dark border-opacity-5 focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-black"
                            }`}
                          >
                            {option}
                          </RadioGroup.Label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
