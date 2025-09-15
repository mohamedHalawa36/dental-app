import { toast } from "sonner";

export const handleConnectionStatus = () => {
  toast.dismiss();
  if (!navigator.onLine)
    toast.error("لايوجد اتصال بالإنترنت", {
      duration: Infinity,
      closeButton: false,
      dismissible: false,
    });

  if (navigator.onLine) {
    toast.success("تم استعادة الاتصال بالإنترنت");
  }
};
