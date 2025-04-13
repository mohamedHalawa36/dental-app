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
        "text-sm text-primary hover:text-secondary transition font-semibold hover:underline hover:underline-offset-4",
        className
      )}
    >
      موعد جديد
    </span>
  );
}
