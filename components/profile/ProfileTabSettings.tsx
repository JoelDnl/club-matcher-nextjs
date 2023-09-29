"use client";

import { Club, MAX_DESCRIPTION_LENGTH, updateClub } from "@/lib/club";
import { TabTransition } from "@/components/ui/Transition";
import { Tab } from "@headlessui/react";
import { SyntheticEvent, useEffect, useState } from "react";
import { tags } from "@/lib/tags";
import { errorToast, successToast } from "../ui/Toast";
import { isValidHttpUrl } from "@/lib/utils";
import { toast } from "react-toastify";
import { useProfileContext } from "@/context/ProfileContext";

export default function ProfileTabSettings({ tabIndex }: { tabIndex: number }) {
  const { profile, setProfile } = useProfileContext();
  const [name, setName] = useState(profile.name);
  const [desc, setDesc] = useState(profile.description);
  const [tag, setTag] = useState(profile.tag);
  const [storefront, setStorefront] = useState(profile.storefront);
  const [westernlink, setWesternLink] = useState(profile.westernlink);

  const [saving, setSaving] = useState(false);

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();
    toast.dismiss();

    if (name !== "" && name.length < 3) {
      errorToast("Please provide a club name with a minimum of 3 characters.");
      return;
    }

    if (desc !== "" && desc.length < 50) {
      errorToast(
        "Please provide a description with a minimum of 50 characters."
      );
      return;
    }

    if (desc !== "" && desc.length > MAX_DESCRIPTION_LENGTH) {
      errorToast(
        `Please provide a description with a maximum of ${MAX_DESCRIPTION_LENGTH} characters.`
      );
      return;
    }

    if (storefront !== "" && !isValidHttpUrl(storefront)) {
      errorToast("Please provide a valid HTTP URL for the storefront.");
      return;
    }

    if (westernlink !== "" && !isValidHttpUrl(westernlink)) {
      errorToast("Please provide a valid HTTP URL for WesternLink.");
      return;
    }

    const newData: Club = {
      name: name === "" ? profile.name : name,
      description: desc === "" ? profile.description : desc,
      tag: tag === "" ? profile.tag : tag,
      storefront: storefront === "" ? profile.storefront : storefront,
      westernlink: westernlink === "" ? profile.westernlink : westernlink,
      quiz: profile.quiz,
      email: profile.email,
    };

    try {
      setSaving(true);

      await updateClub({ data: newData }).then(() => {
        setProfile(newData);
        successToast("Your profile has been updated successfully.");
        setSaving(false);

        return;
      });
    } catch (err) {
      throw err;
    }
  }

  function handleClear() {
    setName(profile.name);
    setDesc(profile.description);
    setTag(profile.tag);
    setStorefront(profile.storefront);
    setWesternLink(profile.westernlink);
  }

  return (
    <Tab.Panel className={`rounded bg-white px-2 sm:px-8`}>
      <TabTransition tabIndex={tabIndex} index={0}>
        <form onSubmit={handleUpdate}>
          <div className="gap-y-4 md:gap-y-8">
            <div className="pt-8 sm:pt-12">
              <div className="grid grid-cols-1 gap-x-4 sm:gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2 space-y-1">
                  <label
                    htmlFor="name"
                    className="text-base font-medium leading-6 text-black"
                  >
                    Club Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your club name"
                      value={name === "" ? profile.name : name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md border-0 py-1.5 px-3 text-black shadow-sm ring-1 ring-inset ring-gray placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-western sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label
                    htmlFor="email"
                    className="text-base font-medium leading-6 text-black"
                  >
                    Registration Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Your registration email"
                      defaultValue={
                        profile.email == null ? undefined : profile.email
                      }
                      disabled
                      className="w-full rounded-md border-0 py-1.5 px-3 text-black shadow-sm ring-1 ring-inset ring-gray placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-western sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="tag"
                    className="text-base font-medium leading-6 text-black"
                  >
                    Category Tag
                  </label>
                  <div className="mt-2">
                    <select
                      id="tag"
                      name="tag"
                      value={tag == "" ? profile.tag : tag}
                      onChange={(e) => setTag(e.target.value)}
                      className="tag w-full rounded-md border-0 py-1.5 px-3 text-black shadow-sm ring-1 ring-inset ring-gray focus:ring-2 focus:ring-inset focus:ring-western sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      {tags.map((tag, index) => {
                        return <option key={"opt-" + index}>{tag}</option>;
                      })}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3 space-y-1">
                  <label
                    htmlFor="storefront"
                    className="text-base font-medium leading-6 text-black"
                  >
                    Storefront URL
                  </label>
                  <input
                    type="text"
                    name="storefront"
                    id="storefront"
                    placeholder="Your storefront URL"
                    value={storefront === "" ? profile.storefront : storefront}
                    onChange={(e) => setStorefront(e.target.value)}
                    className="w-full rounded-md border-0 py-1.5 px-3 text-black shadow-sm ring-1 ring-inset ring-gray placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-western sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="sm:col-span-3 space-y-1">
                  <label
                    htmlFor="westernlink"
                    className="text-base font-medium leading-6 text-black"
                  >
                    WesternLink URL
                  </label>
                  <input
                    type="text"
                    name="westernlink"
                    id="westernlink"
                    placeholder="Your WesternLink URL"
                    value={
                      westernlink === "" ? profile.westernlink : westernlink
                    }
                    onChange={(e) => setWesternLink(e.target.value)}
                    className="w-full rounded-md border-0 py-1.5 px-3 text-black shadow-sm ring-1 ring-inset ring-gray placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-western sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="col-span-full space-y-1">
                  <label
                    htmlFor="about"
                    className="text-base font-medium leading-6 text-black"
                  >
                    Club Description
                  </label>
                  <div className="mt-2">
                    {/* TODO: Add counter for max description length so users can see how many words they type */}
                    <textarea
                      id="description"
                      name="description"
                      rows={Math.trunc(MAX_DESCRIPTION_LENGTH / 100)}
                      className="resize-none w-full rounded-md border-0 py-2.5 px-3 text-black shadow-sm ring-1 ring-inset ring-gray placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-western sm:text-sm sm:leading-6"
                      placeholder="A short description about your club (max. 300 characters)"
                      value={desc === "" ? profile.description : desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 mb-6 sm:mb-0 flex items-center justify-center sm:justify-end gap-x-6 shadow-none border-none">
                <button
                  type="button"
                  onClick={handleClear}
                  className="font-semibold leading-6 text-black"
                >
                  Cancel
                </button>
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
