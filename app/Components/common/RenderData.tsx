import type { ReactNode } from "react";
import PageLoader from "./Loaders/PageLoader";
import NoResultsFound from "./NoResultsFound";

type RenderDataProps = {
  children: ReactNode;
  isEmpty: boolean;
  isFetching: boolean;
};

export default function RenderData({
  children,
  isEmpty,
  isFetching,
}: RenderDataProps) {
  if (isFetching) return <PageLoader />;
  if (isEmpty) return <NoResultsFound />;

  return children;
}
