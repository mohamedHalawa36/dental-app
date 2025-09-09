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
    availability: {
      add: "تم إضافة الموعد بنجاح",
      update: "تم تعديل الموعد بنجاح",
      delete: "تم حذف الموعد بنجاح",
    },
  },
  error: {
    somethingWentWrong: "حدث خطأ ما، برجاء المحاولة مجددا",
    patient: {
      conflict: "لا يمكن حذف المريض لأن لديه حجوزات أو سجلات مرتبطة.",
    },
    appointment: {
      dayConflict: "تم حجز موعد للمريض في نفس اليوم مسبقا",
      timeConflict: "يوجد موعد لمريض اخر في نفس التوقيت",
    },
    auth: {
      invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      invalidEmail: "بريد إلكتروني غير صحيح",
      unAuth: "غير مصرح لك بهذه العملية، برجاء مراجعة المسؤول",
    },
    availability: {
      conflict: "لديك موعد في هذا اليوم بالفعل",
    },
  },
};

export const somethingWentWrongMsg = messages.error.somethingWentWrong;
export const requiredMsg = "مطلوب";
