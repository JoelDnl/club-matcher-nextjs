import React from "react";

export default function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-2/3 lg:w-[45%]">
      <div className="bg-white border-2 border-western h-12 relative w-full rounded">
        <div
          className={`bg-western absolute top-0 left-0 flex h-full items-center justify-center text-lg sm:text-xl font-medium text-white w-full`}
        >
          Match:&nbsp;<span className="font-black">{percent}%</span>
        </div>
      </div>
    </div>
  );
}
