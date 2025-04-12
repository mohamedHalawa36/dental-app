import { cn } from "~/lib/utils";

export default function NewAppointmentBtn({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm text-primary hover:text-secondary transition font-semibold hover:underline hover:underline-offset-4",
        className
      )}
    >
      موعد جديد
    </button>
  );
}
