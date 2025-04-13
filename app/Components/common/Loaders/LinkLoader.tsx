import Spinner from "./Spinner";

export default function LinkLoader() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-400/50 backdrop-blur-sm z-50 flex justify-center items-center">
      <Spinner className="size-16 max-md:size-12" />
    </div>
  );
}
