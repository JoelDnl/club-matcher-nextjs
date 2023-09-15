export default function Spinner({
  className,
  size,
}: {
  className: string;
  size: number;
}) {
  return (
    <div
      className={
        "inline-block ml-2 animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] " +
        "h-" +
        size +
        " w-" +
        size +
        " border-" +
        size +
        " " +
        className
      }
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
    </div>
  );
}
