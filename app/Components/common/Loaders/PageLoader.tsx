export default function PageLoader() {
  return (
    <div className="flex h-full items-center justify-center space-x-5">
      <span className="sr-only">Loading...</span>
      <div className="size-6 animate-bounce rounded-full bg-primary [animation-delay:-0.3s] max-sm:size-5"></div>
      <div className="size-6 animate-bounce rounded-full bg-primary [animation-delay:-0.15s] max-sm:size-5"></div>
      <div className="size-6 animate-bounce rounded-full bg-primary max-sm:size-5"></div>
    </div>
  );
}
