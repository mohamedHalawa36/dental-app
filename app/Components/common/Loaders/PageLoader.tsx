export default function PageLoader() {
  return (
    <div className="flex h-full items-center justify-center space-x-5">
      <span className="sr-only">Loading...</span>
      <div className="size-6 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
      <div className="size-6 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
      <div className="size-6 animate-bounce rounded-full bg-primary"></div>
    </div>
  );
}
