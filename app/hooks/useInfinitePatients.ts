import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import usePageContext from "./usePageContext";
import { getAllPatients } from "~/API/patient";
import type { SelectPatientsResponse } from "~/types/apiData";

type UseInfinitePatientsProps = {
  pageSize: number;
};

export default function useInfinitePatients({
  pageSize,
}: UseInfinitePatientsProps) {
  const { search } = usePageContext();
  const [page, setPage] = useState(1);

  const query = useInfiniteQuery({
    initialPageParam: !!page,
    queryKey: ["patients", search],
    queryFn: ({ signal }) => getAllPatients(search, page, pageSize, signal),
    getNextPageParam: ({ count }: SelectPatientsResponse) => {
      const lastPage = Math.ceil((count as number) / pageSize);
      return page < lastPage || undefined;
    },
    getPreviousPageParam: () => {
      return page === 1 && undefined;
    },
  });

  useEffect(() => {
    setPage(1);
  }, [search]);

  return { ...query, page, setPage };
}
