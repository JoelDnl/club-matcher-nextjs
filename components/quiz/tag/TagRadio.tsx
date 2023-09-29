import { Dispatch, SetStateAction } from "react";
import { RadioGroup } from "@headlessui/react";

export default function TagRadio({
  tags,
  selected,
  setSelected,
}: {
  tags: string[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="w-full py-2">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={setSelected}>
          <div
            className={`${
              tags.length > 4 ? "grid grid-cols-2 gap-2" : "space-y-2"
            }`}
          >
            {tags.map((tag, index) => (
              <RadioGroup.Option
                key={"tag-" + index}
                value={tag}
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
                            {tag}
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
