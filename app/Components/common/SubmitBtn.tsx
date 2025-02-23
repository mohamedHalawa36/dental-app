export default function SubmitBtn({ disabled }: { disabled: boolean }) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="p-3 bg-primary max-sm:w-full w-24 hover:opacity-80 transition rounded-xl mt-3 text-muted font-semibold disabled:bg-gray-400"
    >
      إضافة
    </button>
  );
}
