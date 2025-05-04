import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import * as Yup from "yup";
import { signInUser } from "~/API/auth";
import { messages, somethingWentWrongMsg } from "~/API/messages";
import type { ApiError } from "~/API/supabase";
import Button from "~/Components/common/Button";
import ServerErr from "~/Components/common/serverErr";
import InputField from "~/Components/Forms/Fields/InputField";

const loginSchema = Yup.object({
  email: Yup.string().email("بريد إلكتروني غير صحيح").required("مطلوب"),
  password: Yup.string().required("مطلوب"),
});

export default function LoginForm() {
  const [serverErr, setserverErr] = useState<string | null>(null);

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: signInUser,
    onMutate: () => setserverErr(null),
    onSuccess: () => navigate("/"),
    onError: (data: ApiError) => {
      const { code, statusCode } = data;
      if (statusCode === 400 && code === "invalid_credentials") {
        const { invalidCredentials } = messages.error.auth;
        setserverErr(invalidCredentials);
      } else {
        toast.error(somethingWentWrongMsg);
      }
    },
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(userData) => mutate(userData)}
    >
      <div className=" bg-[linear-gradient(45deg,rgb(var(--secondary)),rgb(var(--primary)))] h-full w-full flex justify-center items-center">
        <div className="flex flex-col gap-5 w-[25rem] bg-white max-sm:max-w-[90%] max-h-[90%] max-sm:rounded-3xl rounded-[50px] pb-8 pt-3  ">
          <img
            src="/images/full-logo.png"
            alt="logo"
            className="object-contain w-48 mx-auto max-sm:w-40"
          />
          <Form>
            <div className="px-7 flex-1 overflow-auto flex flex-col gap-3">
              <InputField
                className=" [&>div]:border-primary/50 [&>div]:transition"
                name="email"
                label="البريد الإلكتروني"
                disabled={isPending}
              />
              <InputField
                className=" [&>div]:border-primary/50 [&>div]:transition"
                name="password"
                label="كلمة السر"
                disabled={isPending}
              />
              {serverErr && <ServerErr>{serverErr}</ServerErr>}
              <Button
                variant="primary"
                label="تسجيل الدخول"
                className="w-full"
                disabled={isPending}
                type="submit"
              />
            </div>
          </Form>
        </div>
      </div>
    </Formik>
  );
}
