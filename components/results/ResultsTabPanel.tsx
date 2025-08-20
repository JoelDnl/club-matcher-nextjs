import { ClubWithScore } from "@/lib/club";
import { FaGlobe, FaStore } from "react-icons/fa";
import { FaAt } from "react-icons/fa6";
import { GoTrophy } from "react-icons/go";
import { IoPricetags } from "react-icons/io5";
import { TabTransition } from "@/components/ui/Transition";
import { Tab } from "@headlessui/react";
import ProgressBar from "@/components/ui/ProgressBar";

export default function ResultsTabPanel({
  rank,
  clubData,
  tabIndex,
  loading,
  onTagClick,
}: {
  rank: number;
  clubData: ClubWithScore;
  tabIndex: number;
  loading: boolean;
  onTagClick?: (tag?: string) => void;
}) {
  const aClassName =
    "col-span-3 sm:col-span-1 text-black text-opacity-75 hover:text-western transition-colors font-semibold text-lg inline-flex items-center justify-center tracking-wide";
  const matchPercent =
    clubData.matchScore >= 1 ? 100.0 : clubData.matchScore * 100;

  return (
    <Tab.Panel className={`rounded bg-white pt-8 sm:pt-8 px-4 text-center`}>
      <div className="flex w-full justify-center">
        <GoTrophy className="text-western text-[100px]" />
      </div>
      <TabTransition tabIndex={tabIndex} index={rank - 1}>
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-wide text-black mt-6 mb-4 sm:my-6">
            {loading ? "Loading club name..." : clubData.name}
          </h2>
          <span className="...">{clubData.tag}</span>
          <button
            type="button"
            onClick={() => onTagClick?.(String(clubData.tag ?? ""))}
            className="flex items-center justify-center bg-white text-western text-center border-2 border-western rounded px-3 py-2 leading-tight focus:outline-none hover:bg-purple-50 w-2/3 lg:w-[45%]"
            title="Show more clubs in this category"
          >
            <IoPricetags className="hidden sm:flex text-2xl mr-2" />
            <span>{loading ? "Loading tag" : clubData.tag}</span>
          </button>
          <ProgressBar percent={Math.trunc(matchPercent)} />
          <p className="break-words sm:w-2/3 mx-auto text-center text-black text-opacity-90 text-lg sm:text-xl font-normal tracking-wide mt-4 sm:pt-2">
            {loading ? "Loading description..." : clubData.description}
          </p>
        </div>
      </TabTransition>
      <TabTransition tabIndex={tabIndex} index={rank - 1}>
        <div className="grid grid-cols-3 w-fit lg:w-1/2 mx-auto mt-12 sm:mt-16 gap-4">
          <a
            href={loading ? "" : `mailto:${clubData.email}`}
            className={aClassName}
          >
            <FaAt className="mr-2 text-2xl" />
            <span>Email</span>
          </a>
          <a
            href={loading ? "" : clubData.westernlink}
            className={aClassName}
            target="_blank"
          >
            <FaGlobe className="mr-2 text-2xl" />
            <span>WesternLink</span>
          </a>
          <a
            href={loading ? "" : clubData.storefront}
            className={aClassName}
            target="_blank"
          >
            <FaStore className="mr-2 text-2xl" />
            <span>Storefront</span>
          </a>
        </div>
      </TabTransition>
    </Tab.Panel>
  );
}
