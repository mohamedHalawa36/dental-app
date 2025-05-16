import { App as CapacitorApp } from "@capacitor/app";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { PageContext } from "~/Contexts/PageContext";

export default function useAttachBackBtn() {
  const {
    addNewOpen,
    setAddNewOpen,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
  } = useContext(PageContext);

  const navigate = useNavigate();

  useEffect(() => {
    const attachListenere = async () => {
      const listener = await CapacitorApp.addListener("backButton", () => {
        if (isMobileSidebarOpen) setIsMobileSidebarOpen(false);
        else if (addNewOpen) {
          setAddNewOpen(false);
          return;
        } else if (window.history.length > 1) return navigate(-1);
        else CapacitorApp.exitApp();
      });

      return () => {
        listener.remove();
      };
    };

    const cleanUp = attachListenere();

    return () => {
      cleanUp.then((removeListener) => removeListener && removeListener());
    };
  }, [addNewOpen, isMobileSidebarOpen]);
}
