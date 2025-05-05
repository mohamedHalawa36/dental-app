export default function NoResultsFound({
  label = "لا توجد نتائج",
}: {
  label?: string;
}) {
  return (
    <p className="mt-5 flex-1 text-center text-2xl text-slate-500 max-sm:text-base">
      {label}
    </p>
  );
}
