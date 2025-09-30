import { cn } from "~/lib/utils";

export default function BookAppointmentBtn({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <span
      onClick={onClick}
      className={cn(
        "text-sm font-semibold text-primary transition hover:text-secondary hover:underline hover:underline-offset-4",
        className,
      )}
    >
      حجز موعد
    </span>
  );
}
