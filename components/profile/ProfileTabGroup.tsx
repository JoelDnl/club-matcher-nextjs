import { useState } from "react";
import { Tab } from "@headlessui/react";
import { Club } from "@/lib/club";
import { MdQuiz } from "react-icons/md";
import { AiFillEye, AiFillSetting } from "react-icons/ai";
import ProfileTabSettings from "@/components/profile/ProfileTabSettings";
import ProfileTabQuiz from "./ProfileTabQuiz";
import ProfileTabPreview from "./ProfileTabPreview";

export default function ProfileTabGroup({}) {
  const [tabIndex, setTabIndex] = useState(0);
  const tabs = [
    {
      text: "Settings",
      icon: <AiFillSetting className="sm:mr-1.5 text-3xl m-1 sm:m-0" />,
    },
    {
      text: "Quiz",
      icon: <MdQuiz className="sm:mr-1.5 text-3xl m-1 sm:m-0" />,
    },
    {
      text: "Preview",
      icon: <AiFillEye className="sm:mr-1.5 text-3xl m-1 sm:m-0" />,
    },
  ];

  return (
    <div className="w-11/12 sm:w-screen px-0 sm:px-8 pt-6 pb-0 sm:py-8">
      <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
        <Tab.List className="flex justify-center">
          {tabs.map((tab) => {
            return (
              <Tab
                key={`tab-${tab.text.toLowerCase()}`}
                className={({ selected }) => {
                  return `rounded-md py-2.5 text-lg font-semibold leading-5 text-western bg-white hover:bg-gray hover:bg-opacity-30 focus:outline-none focus:ring-none border-0 w-2/5 sm:w-1/4 shadow transition-colors ${
                    selected ? "border-b-4  border-western" : ""
                  }`;
                }}
              >
                <div className="inline-flex justify-center items-center py-1">
                  {tab.icon}
                  <h4 className="text-base sm:text-lg hidden sm:block">
                    {tab.text}
                  </h4>
                </div>
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels className="mt-8 sm:mt-6">
          <ProfileTabSettings tabIndex={tabIndex} />
          <ProfileTabQuiz tabIndex={tabIndex} />
          <ProfileTabPreview tabIndex={tabIndex} />
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
