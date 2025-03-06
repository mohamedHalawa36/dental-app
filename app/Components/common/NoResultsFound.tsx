export default function NoResultsFound({
  label = "لا توجد نتائج",
}: {
  label?: string;
}) {
  return (
    <p className="text-2xl max-sm:text-base text-center text-slate-500 flex-1">
      {label}
    </p>
  );
}
