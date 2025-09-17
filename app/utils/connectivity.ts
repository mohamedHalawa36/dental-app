import { toast } from "sonner";
import { messages } from "~/API/messages";

export const handleConnectionStatus = () => {
  const connectionLostMsg = messages.error.connection;
  const connectionRestoredMsg = messages.success.connection;

  toast.dismiss();
  if (!navigator.onLine)
    toast.error(connectionLostMsg, {
      duration: Infinity,
      closeButton: false,
      dismissible: false,
    });

  if (navigator.onLine) {
    toast.success(connectionRestoredMsg);
  }
};
