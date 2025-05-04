import PageLoader from "./Loaders/PageLoader";

export default function LoadingOverlay() {
  return (
    <div className="fixed z-[999] top-0 start-0 flex justify-center items-center h-screen w-screen bg-white/25">
      <PageLoader />
    </div>
  );
}
