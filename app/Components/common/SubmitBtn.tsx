export default function SubmitBtn({
  label,
  disabled,
}: {
  label: string;
  disabled: boolean;
}) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="mt-3 w-24 rounded-xl bg-primary p-3 font-semibold text-muted transition hover:opacity-80 disabled:bg-gray-400 max-sm:w-full"
    >
      {label}
    </button>
  );
}
