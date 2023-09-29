"use client";

import { updateClubQuiz } from "@/lib/club";
import { TabTransition } from "@/components/ui/Transition";
import { Tab } from "@headlessui/react";
import { SyntheticEvent, useState } from "react";
import { successToast } from "../ui/Toast";
import { toast } from "react-toastify";
import { useProfileContext } from "@/context/ProfileContext";
import QuizModule from "../quiz/QuizModule";

export default function ProfileTabQuiz({ tabIndex }: { tabIndex: number }) {
  const { profile, setProfile } = useProfileContext();
  const [saving, setSaving] = useState(false);

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();
    toast.dismiss();

    try {
      setSaving(true);

      await updateClubQuiz({
        data: profile.quiz,
        email: profile.email,
      }).then(() => {
        successToast("Your quiz answers have been updated successfully.");
        setSaving(false);

        return;
      });
    } catch (err) {
      throw err;
    }
  }

  return (
    <Tab.Panel className={`rounded bg-white`}>
      <TabTransition tabIndex={tabIndex} index={1}>
        <form onSubmit={handleUpdate}>
          <div className="gap-y-4 md:gap-y-8">
            <div className="pt-8 sm:pt-12">
              <div className="grid grid-cols-1 gap-x-4 sm:gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <QuizModule type="profile" />
                </div>
              </div>
              <div className="px-0 sm:px-8 mt-8 mb-6 sm:mb-0 flex items-center justify-center sm:justify-end gap-x-6 shadow-none border-none">
                <button
                  type="submit"
                  className="rounded-md bg-western px-3 py-2 font-semibold text-white shadow-sm hover:bg-western focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-western"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </TabTransition>
    </Tab.Panel>
  );
}
