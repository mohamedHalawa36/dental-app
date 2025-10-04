import { useContext } from "react";
import { PageContext } from "~/Contexts/PageContext";

export default function usePageContext() {
  const context = useContext(PageContext);
  if (!context)
    throw new Error("Can't use page context outside of page provider");

  return context;
}
