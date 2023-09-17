export default function Spinner({
  className,
  size,
}: {
  className: string;
  size: string;
}) {
  return (
    <div
      className={`animate-spin motion-reduce:animate-[spin_1.5s_linear_infinite] inline-block w-${size} h-${size} border-[5px] border-current border-t-transparent rounded-full align-[-0.2em] ml-2`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
