import { useEffect, type DependencyList } from "react";
import { useNavigate } from "react-router";

export default function useAttachBackBtn(
  attachCallback: ({ canGoBack }: { canGoBack: boolean }) => void,
  deps: DependencyList,
) {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      const canGoBack = window.history.length > 0;
      attachCallback({ canGoBack });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [attachCallback, navigate, ...deps]);
}
