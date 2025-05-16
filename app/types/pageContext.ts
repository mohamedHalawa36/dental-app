import type { Dispatch, SetStateAction } from "react";

export type PageContextArgs = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  addNewOpen: boolean;
  setAddNewOpen: Dispatch<SetStateAction<boolean>>;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: Dispatch<SetStateAction<boolean>>;
};
