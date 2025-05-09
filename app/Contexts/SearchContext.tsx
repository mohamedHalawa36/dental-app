import { createContext, useState, type ReactNode } from "react";
import type { searchContextArgs } from "~/types/searchConntext";

export const SearchContext = createContext<searchContextArgs>({
  search: "",
  setSearch: () => {},
});

export default function SearchProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
