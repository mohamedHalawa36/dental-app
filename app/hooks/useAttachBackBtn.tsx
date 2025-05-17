import { App as CapacitorApp } from "@capacitor/app";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function useAttachBackBtn() {
  const navigate = useNavigate();

  useEffect(() => {
    const attachListenere = async () => {
      const listener = await CapacitorApp.addListener(
        "backButton",
        ({ canGoBack }) => {
          const body = document.body;
          const isPopoverOpen = !!body.querySelector(
            "span[data-radix-focus-guard]",
          );
          if (isPopoverOpen) return;
          if (canGoBack) navigate(-1);
          else {
            CapacitorApp.exitApp();
          }
        },
      );

      return () => {
        listener.remove();
      };
    };

    const cleanUp = attachListenere();

    return () => {
      cleanUp.then((removeListener) => removeListener && removeListener());
    };
  }, []);
}
