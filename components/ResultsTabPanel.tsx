import { ClubWithScore } from "@/lib/club";
import { RiMailSendLine } from "react-icons/ri";
import { SiMaildotru } from "react-icons/si";
import { TbMailPlus } from "react-icons/tb";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { FaGlobe, FaHome, FaStore } from "react-icons/fa";
import { FaArrowUpRightFromSquare, FaAt } from "react-icons/fa6";
import { BiSolidArrowFromLeft } from "react-icons/bi";
import { GoTrophy } from "react-icons/go";
import { MdChecklist, MdOutlineQuiz } from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";
import { IoPricetags } from "react-icons/io5";
import { ReactElement } from "react";
import { TabTransition } from "./ui/Transitions";
import { Tab } from "@headlessui/react";
import ProgressBar from "./ui/ProgressBar";

export default function ResultsTabPanel({
  rank,
  clubData,
  tabIndex,
  loading,
}: {
  rank: number;
  clubData: ClubWithScore;
  tabIndex: number;
  loading: boolean;
}) {
  const aClassName =
    "col-span-3 sm:col-span-1 text-black text-opacity-75 hover:text-western transition-colors font-semibold text-lg inline-flex items-center justify-center tracking-wide";
  const matchPercent = clubData.matchScore * 100;
  const circumference = ((2 * 22) / 7) * 120;

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
          <div className="flex flex-col sm:flex-row flex-wrap w-11/12 sm:max-w-2xl mx-auto justify-center items-center mt-4 sm:my-4 text-black text-opacity-90 text-lg sm:text-xl font-medium gap-2 sm:gap-4">
            <div
              className={`flex items-center justify-center bg-white text-western text-center border-2 border-western rounded px-3 py-2 leading-tight focus:outline-none w-2/3 lg:w-[45%]`}
            >
              <IoPricetags className="hidden sm:flex text-2xl mr-2" />
              <span>{loading ? "Loading tag" : clubData.tag}</span>
            </div>
            <ProgressBar percent={Math.trunc(matchPercent)} />
          </div>
          <div className="justify-center items-center text-black text-opacity-90 text-lg sm:text-xl font-medium mt-4 sm:mt-0 w-11/12 sm:max-w-4xl mx-auto">
            {loading ? "Loading description..." : clubData.description}
          </div>
        </div>
      </TabTransition>
      <TabTransition tabIndex={tabIndex} index={rank - 1}>
        <div className="grid grid-cols-3 w-fit lg:w-1/2 mx-auto mt-12 sm:mt-12 gap-4">
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
