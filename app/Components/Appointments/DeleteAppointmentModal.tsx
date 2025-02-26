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
    <div className="flex flex-col gap-7 justify-center items-center">
      <div className="flex flex-col gap-3 justify-center items-center">
        <span className="font-bold text-xl">هل تريد إلغاء موعد</span>
        <span className="font-semibold text-primary">{patientName}</span>
      </div>
      <div className="flex items-center gap-6">
        <button
          disabled={isDisabled}
          className=" border-secondary font-medium w-20 text-secondary hover:bg-secondary hover:text-white transition rounded-xl h-fit px-5 py-2 border"
          onClick={yesCallBack}
        >
          نعم
        </button>
        <button
          disabled={isDisabled}
          className=" border-foreground font-medium w-20 text-foreground hover:bg-foreground hover:text-white transition rounded-xl h-fit px-5 py-2 border"
          onClick={noCallBack}
        >
          لا
        </button>
      </div>
    </div>
  );
}
