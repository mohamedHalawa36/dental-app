import { toast } from "sonner";

export const handleConnectionStatus = () => {
  toast.dismiss();
  if (!navigator.onLine) toast.error("No internet connection");

  if (navigator.onLine) {
    toast.success("Connection Restored");
  }
};
