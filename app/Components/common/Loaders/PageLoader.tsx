export default function PageLoader() {
  return (
    <div className="flex space-x-5 justify-center h-full items-center">
      <span className="sr-only">Loading...</span>
      <div className="size-6 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="size-6 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="size-6 bg-primary rounded-full animate-bounce"></div>
    </div>
  );
}
