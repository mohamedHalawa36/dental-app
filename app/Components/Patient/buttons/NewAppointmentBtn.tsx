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
        "text-sm font-semibold text-primary transition hover:text-secondary hover:underline hover:underline-offset-4",
        className,
      )}
    >
      موعد جديد
    </button>
  );
}
