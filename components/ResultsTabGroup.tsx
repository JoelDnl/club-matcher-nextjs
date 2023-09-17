import { useState } from "react";
import { Tab } from "@headlessui/react";
import { ClubWithScore, NULL_CLUB_WITH_SCORE } from "@/lib/club";
import ResultsTabPanel from "@/components/ResultsTabPanel";
import { FaStar } from "react-icons/fa6";

export default function ResultsTabGroup({
  loading,
  data,
}: {
  loading: boolean;
  data: ClubWithScore[];
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const defaultData: ClubWithScore[] = [
    NULL_CLUB_WITH_SCORE,
    NULL_CLUB_WITH_SCORE,
    NULL_CLUB_WITH_SCORE,
  ];
  const ranks: number[] = [0, 1, 2];

  return (
    <div className="mx-auto w-11/12 sm:max-w-6xl px-2 sm:px-8 pt-6 pb-0 sm:py-8">
      <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
        <Tab.List className="flex justify-center">
          {ranks.map((index) => {
            return (
              <Tab
                key={`tab-${index + 1}`}
                className={({ selected }) => {
                  return `rounded-md py-2.5 text-lg font-semibold leading-5 text-western bg-white hover:bg-gray hover:bg-opacity-30 focus:outline-none focus:ring-none border-0 w-2/5 sm:w-1/4 shadow transition-colors ${
                    selected ? "border-b-4  border-western" : ""
                  }`;
                }}
              >
                <div className="inline-flex justify-center items-center mr-1">
                  <FaStar className="hidden sm:inline-flex mr-1.5 text-xl" />{" "}
                  <span className="hidden sm:inline-flex">Rank&nbsp;</span>
                  <h4 className="text-xl sm:text-lg">{index + 1}</h4>
                </div>
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels className="mt-4 sm:mt-6">
          {data.length > 0
            ? data.map((club, index) => {
                return (
                  <ResultsTabPanel
                    key={`panel-${index + 1}`}
                    rank={index + 1}
                    clubData={club}
                    tabIndex={tabIndex}
                    loading={loading}
                  />
                );
              })
            : defaultData.map((club, index) => {
                return (
                  <ResultsTabPanel
                    key={`panel-${index + 1}`}
                    rank={index + 1}
                    clubData={club}
                    tabIndex={tabIndex}
                    loading={loading}
                  />
                );
              })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
