import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import QuizRegisterRadio from "./QuizRegisterRadio";
import { useQuizContext } from "@/context/QuizContext";
import { FaCheck } from "react-icons/fa";

export default function QuizRegisterModal({
  id,
  question,
  options,
}: {
  id: number;
  question: string;
  options: string[];
}) {
  let { quizData } = useQuizContext();
  let [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`w-full bg-gray ${
            quizData[id] > -1 ? "text-western" : "text-black"
          } sm:text-black border-2 border-gray_dark border-opacity-5 hover:border-western hover:text-western rounded px-4 py-2 text-normal font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          Question {id}{" "}
          <FaCheck
            className={`hidden text-western ml-1 text-[20px] ${
              quizData[id] > -1 ? "sm:inline-flex" : "sm:hidden"
            }`}
          />
        </button>
      </div>

      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {question}
                  </Dialog.Title>
                  <div className="mt-2">
                    <QuizRegisterRadio id={id} options={options} />
                  </div>

                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-western bg-opacity-20 px-4 py-2 text-sm font-medium text-western hover:bg-western hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-western focus-visible:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      Select Answer
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
