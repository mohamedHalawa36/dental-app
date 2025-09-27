import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import ConnectionLost from "../icons/ConnectionLost";

export default function LostConnectModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConnectionModal = () => {
    if (navigator.onLine) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("online", handleConnectionModal);
    window.addEventListener("offline", handleConnectionModal);
    return () => {
      window.removeEventListener("online", handleConnectionModal);
      window.removeEventListener("offline", handleConnectionModal);
    };
  }, []);

  return (
    <Modal
      title="فقد الاتصال بالشبكة"
      isOpen={isOpen}
      className="duration-1000 data-[state=closed]:slide-out-to-bottom-0 data-[state=open]:slide-in-from-top-0"
    >
      <div className="flex flex-col items-center gap-3 text-secondary">
        <div>
          <ConnectionLost className="size-16 fill-primary" />
        </div>
        <p className="text-lg sm:text-xl"> لا يوجد اتصال بالانترنت</p>
      </div>
    </Modal>
  );
}
