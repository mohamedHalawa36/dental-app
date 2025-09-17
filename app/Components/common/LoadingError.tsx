import { useNavigate } from "react-router";
import { somethingWentWrongMsg } from "~/API/messages";
import { cn } from "~/lib/utils";

export default function LoadingError({ className }: { className?: string }) {
  const navigate = useNavigate();

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <p className="font-bold text-secondary lg:text-xl">
        {somethingWentWrongMsg}
      </p>
      <button
        onClick={() => navigate(0)}
        className="text-primary transition-all hover:underline max-lg:text-sm"
      >
        أعد تحميل الصفحة
      </button>
    </div>
  );
}
