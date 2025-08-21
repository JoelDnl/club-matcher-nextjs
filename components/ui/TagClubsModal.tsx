import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { IoPricetags } from "react-icons/io5";
import Card from "@/components/ui/Card";
import { Club } from "@/lib/club";

export default function TagClubsModal({
  tag,
  currentEmail,
  loading,
}: {
  tag: string;
  currentEmail: string | null;
  loading: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (open) {
      (async () => {
        setFetching(true);
        const res = await fetch("/api/tag", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tag }),
        });
        const result = await res.json();
        const filtered = result.data.filter(
          (c: Club) => c.email !== currentEmail
        );
        setClubs(filtered);
        setFetching(false);
      })();
    }
  }, [open, tag, currentEmail]);

  return (
    <>
      <button
        type="button"
        disabled={loading}
        onClick={() => setOpen(true)}
        className={`flex items-center justify-center bg-white text-western text-center border-2 border-western rounded px-3 py-2 leading-tight focus:outline-none w-2/3 lg:w-[45%] ${
          loading ? "cursor-not-allowed opacity-50" : "hover:text-western"
        }`}
      >
        <IoPricetags className="hidden sm:flex text-2xl mr-2" />
        <span>{loading ? "Loading tag" : tag}</span>
      </button>

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                  >
                    More in {tag}
                  </Dialog.Title>
                  {fetching ? (
                    <p className="text-center">Loading...</p>
                  ) : clubs.length === 0 ? (
                    <p className="text-center">No other clubs found.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {clubs.map((club, index) => (
                        <Card key={club.email ?? index} className="space-y-2">
                          <h4 className="text-xl font-semibold">{club.name}</h4>
                          <p className="text-base font-normal">
                            {club.description}
                          </p>
                          <a
                            href={club.westernlink}
                            target="_blank"
                            className="text-western font-semibold hover:underline"
                          >
                            View on WesternLink
                          </a>
                        </Card>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-western bg-opacity-20 px-4 py-2 text-sm font-medium text-western hover:bg-western hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-western focus-visible:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      Close
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