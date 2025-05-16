import { createContext, useState, type ReactNode } from "react";
import type { PageContextArgs } from "~/types/pageContext";

export const PageContext = createContext<PageContextArgs>({
  search: "",
  setSearch: () => {},
  addNewOpen: false,
  setAddNewOpen: () => {},
  isMobileSidebarOpen: false,
  setIsMobileSidebarOpen: () => {},
});

export default function PageProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const [addNewOpen, setAddNewOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <PageContext.Provider
      value={{
        search,
        setSearch,
        addNewOpen,
        setAddNewOpen,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}
