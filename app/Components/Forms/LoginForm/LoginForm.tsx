import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { getUserProfile, signInUser } from "~/API/auth";
import { messages, somethingWentWrongMsg } from "~/API/messages";
import type { ApiError } from "~/API/supabase";
import Button from "~/Components/common/Button";
import ServerErr from "~/Components/common/ServerErr";
import InputField from "~/Components/Forms/Fields/InputField";
import useAuth from "~/hooks/useAuth";
import { loginSchema } from "./schema";

export default function LoginForm() {
  const [serverErr, setserverErr] = useState<string | null>(null);

  const { setUser } = useAuth();

  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: signInUser,
    onMutate: () => setserverErr(null),
    onSuccess: async (data) => {
      const user = data.data;
      const { data: userProfile, error } = await getUserProfile(user?.id ?? "");
      if (!error) {
        setUser(userProfile);
        navigate("/");
      } else {
        toast.error("حدث خطأ أثناء تسجيل الدخول، حاول مرة أخرى");
      }
    },
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
      <Form className="flex-1">
        <div className="flex flex-1 flex-col gap-3 overflow-auto px-7 max-sm:px-5">
          <InputField
            className="[&>div]:border-primary/50 [&>div]:transition"
            name="email"
            label="البريد الإلكتروني"
            disabled={isPending}
            autoComplete="on"
          />
          <InputField
            className="[&>div]:border-primary/50 [&>div]:transition"
            name="password"
            label="كلمة السر"
            disabled={isPending}
            type="password"
            autoComplete="on"
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
    </Formik>
  );
}
