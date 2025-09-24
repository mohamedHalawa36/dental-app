import * as Yup from "yup";
import { requiredMsg } from "~/API/messages";

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(6, "يجب أن لا تقل كلمة السر عن 6 حروف")
    .required(requiredMsg),

  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "كلمة السر غير متطابقة")
    .required(requiredMsg),
});

export const initialResetPasswordValue = {
  password: "",
  confirm_password: "",
};
