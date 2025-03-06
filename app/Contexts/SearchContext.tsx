import { createContext, type ReactNode } from "react";
import type { searchContextArgs } from "~/types/searchConntext";

export const SearchContext = createContext<searchContextArgs>({
  search: "",
  setSearch: () => {},
});

export default function SearchProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: searchContextArgs;
}) {
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
