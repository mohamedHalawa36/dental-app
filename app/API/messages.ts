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
    user: {
      add: "تم إضافة المستخدم بنجاح",
      update: "تم تعديل المستخدم بنجاح",
      delete: "تم حذف المستخدم بنجاح",
      activate: "تم إعادة تفعيل المستخدم",
      deActivate: "تم إلغاء تفعيل المستخدم",
    },
    connection: "تم استعادة الاتصال بالإنترنت",
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
      login: "حدث خطأ أثناء تسجيل الدخول، حاول مرة أخرى",
      userNotFound: "لم نستطع العثور على معلومات المستخدم، برجاء تسجيل الدخول",
    },
    availability: {
      conflict: "لديك موعد في هذا اليوم بالفعل",
    },
    user: {
      emailExists: "البريد الإلكتروني مستخدم بالفعل",
    },
    connection: "لايوجد اتصال بالإنترنت",
  },
};

export const somethingWentWrongMsg = messages.error.somethingWentWrong;
export const requiredMsg = "مطلوب";
export const somethingWentWrongToastId = "api-error";
