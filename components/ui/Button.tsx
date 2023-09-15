import { ReactNode } from "react";

export default function Button({
  className,
  type,
  children,
}: {
  className: string;
  type: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
}) {
  return (
    <button
      className={
        "text-center font-semibold text-base bg-western text-white hover:bg-white hover:text-western border-2 border-western p-4 focus:outline-none transition-colors rounded " +
        className
      }
      type={type}
    >
      {children}
    </button>
  );
}
