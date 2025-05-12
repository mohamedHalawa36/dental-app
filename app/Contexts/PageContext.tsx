import { createContext, useState, type ReactNode } from "react";
import type { PageContextArgs } from "~/types/pageContext";

export const PageContext = createContext<PageContextArgs>({
  search: "",
  setSearch: () => {},
  addNewOpen: false,
  setAddNewOpen: () => {},
});

export default function SearchProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const [addNewOpen, setAddNewOpen] = useState(false);

  return (
    <PageContext.Provider
      value={{ search, setSearch, addNewOpen, setAddNewOpen }}
    >
      {children}
    </PageContext.Provider>
  );
}
