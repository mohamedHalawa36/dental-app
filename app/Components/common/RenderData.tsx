import type { ReactNode } from "react";
import PageLoader from "./Loaders/PageLoader";
import NoResultsFound from "./NoResultsFound";
import LoadingError from "./LoadingError";

type RenderDataProps = {
  children: ReactNode;
  isEmpty: boolean;
  isFetching: boolean;
  isError: boolean;
};

export default function RenderData({
  children,
  isEmpty,
  isFetching,
  isError,
}: RenderDataProps) {
  if (isFetching) return <PageLoader />;
  if (isEmpty) return <NoResultsFound />;
  if (isError) return <LoadingError className="mt-10" />;

  return children;
}
