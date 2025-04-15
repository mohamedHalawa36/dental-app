export const messages = {
  success: {
    patient: {
      add: "تم إضافة المريض بنجاح",
      update: "تم تعديل المريض بنجاح",
      delete: "تم حذف المريض",
    },
    appointment: {
      add: "تم حجز الموعد",
      update: "تم تعديل الموعد بنجاح",
      delete: "تم إلغاء الموعد",
    },
  },
  error: {
    somethingWentWrong: "حدث خطأ ما، برجاء المحاولة مجددا",
    patient: {
      conflict: "لا يمكن حذف المريض لأن لديه حجوزات أو سجلات مرتبطة.",
    },
    appointment: {
      conflict: "تم حجز موعد للمريض في نفس اليوم مسبقا",
    },
  },
};

export const somethingWentWrongMsg = messages.error.somethingWentWrong;
