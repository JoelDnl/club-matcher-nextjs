import ResultsTabPanel from "../results/ResultsTabPanel";
import { useProfileContext } from "@/context/ProfileContext";

export default function ProfileTabPreview({ tabIndex }: { tabIndex: number }) {
  const { profile } = useProfileContext();

  return (
    <ResultsTabPanel
      rank={3} // enables panel since rank 3 == tab index 2
      tabIndex={tabIndex}
      loading={false}
      clubData={Object.assign(profile, { matchScore: 1 })}
    />
  );
}
