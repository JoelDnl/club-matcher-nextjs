import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import TagRadio from "./TagRadio";
import { HiCursorClick } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { FaRegHandPointer } from "react-icons/fa";
import { LuPointer } from "react-icons/lu";
import { LiaHandPointer } from "react-icons/lia";

export default function TagModal({
  buttonClass,
  tags,
  selected,
  setSelected,
}: {
  buttonClass: string;
  tags: string[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}) {
  let [open, setOpen] = useState(false);

  return (
    <>
      <div className="items-center justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`bg-white text-black text-center border-2 border-western hover:text-western rounded px-3 py-2 leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${buttonClass} ${
            selected == "" ? "text-opacity-60" : ""
          }`}
        >
          Tag{" "}
          {selected == "" ? (
            <LuPointer className="inline-flex ml-[2px] text-lg" />
          ) : (
            <FaCheck className="inline-flex ml-[2px] text-lg" />
          )}
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
                    Select your club&apos;s category tag
                  </Dialog.Title>
                  <div className="mt-2">
                    <TagRadio
                      tags={tags}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </div>

                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-western bg-opacity-20 px-4 py-2 text-sm font-medium text-western hover:bg-western hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-western focus-visible:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      Select Tag
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
