import { ReactNode } from "react";

export default function Card({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      className={
        "flex flex-col text-left rounded bg-gray text-black p-8 space-y-4 min-h-full " +
        className
      }
    >
      {children}
    </div>
  );
}
