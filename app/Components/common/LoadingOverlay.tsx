import PageLoader from "./Loaders/PageLoader";

export default function LoadingOverlay() {
  return (
    <div className="fixed start-0 top-0 z-[999] flex h-screen w-screen items-center justify-center bg-white/25">
      <PageLoader />
    </div>
  );
}
