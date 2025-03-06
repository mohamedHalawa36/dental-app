import type { Dispatch, SetStateAction } from "react";

export type searchContextArgs = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};
