import Spinner from "./Spinner";

export default function LinkLoader() {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-400/50 backdrop-blur-sm">
      <Spinner className="size-16 max-md:size-12" />
    </div>
  );
}
