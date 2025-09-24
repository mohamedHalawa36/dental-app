import * as Yup from "yup";
import { messages, requiredMsg } from "~/API/messages";

const { invalidEmail } = messages.error.auth;

export const loginSchema = Yup.object({
  email: Yup.string().email(invalidEmail).required(requiredMsg),
  password: Yup.string()
    .min(6, "يجب أن لا تقل كلمة السر عن 6 حروف")
    .required(requiredMsg),
});
