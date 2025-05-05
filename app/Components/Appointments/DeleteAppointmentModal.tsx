export default function DeleteAppointmentModal({
  yesCallBack,
  noCallBack,
  patientName,
  isDisabled,
}: {
  yesCallBack: () => void;
  noCallBack: () => void;
  patientName: string;
  isDisabled: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-7">
      <div className="flex flex-col items-center justify-center gap-3">
        <span className="text-xl font-bold">هل تريد إلغاء موعد</span>
        <span className="font-semibold text-primary">{patientName}</span>
      </div>
      <div className="flex items-center gap-6">
        <button
          disabled={isDisabled}
          className="h-fit w-20 rounded-xl border border-secondary px-5 py-2 font-medium text-secondary transition hover:bg-secondary hover:text-white"
          onClick={yesCallBack}
        >
          نعم
        </button>
        <button
          disabled={isDisabled}
          className="h-fit w-20 rounded-xl border border-foreground px-5 py-2 font-medium text-foreground transition hover:bg-foreground hover:text-white"
          onClick={noCallBack}
        >
          لا
        </button>
      </div>
    </div>
  );
}
