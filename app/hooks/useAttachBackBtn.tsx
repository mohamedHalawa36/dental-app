import { App as CapacitorApp } from "@capacitor/app";
import { useEffect, type DependencyList } from "react";

export default function useAttachBackBtn(
  attachCallback: ({ canGoBack }: { canGoBack: boolean }) => void,
  deps: DependencyList,
) {
  useEffect(() => {
    const attachListener = async () => {
      const listener = await CapacitorApp.addListener(
        "backButton",
        attachCallback,
      );

      return () => {
        listener.remove();
      };
    };

    const cleanUp = attachListener();

    return () => {
      cleanUp.then((removeListener) => removeListener && removeListener());
    };
  }, deps);
}
