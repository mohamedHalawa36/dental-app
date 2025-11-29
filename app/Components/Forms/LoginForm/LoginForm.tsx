import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { signInUser } from "~/API/auth";
import { messages, somethingWentWrongToastId } from "~/API/messages";
import type { ApiError } from "~/API/supabase";
import Button from "~/Components/common/Button";
import ServerErr from "~/Components/common/ServerErr";
import InputField from "~/Components/Forms/Fields/InputField";
import useAuth from "~/hooks/useAuth";
import { loginSchema } from "./schema";

const { login: loginErrorMsg } = messages.error.auth;

export default function LoginForm() {
  const [serverErr, setserverErr] = useState<string | null>(null);

  const { setAuthData } = useAuth();

  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: signInUser,
    onMutate: () => setserverErr(null),
    onSuccess: async (data) => {
      setAuthData(() => ({
        user: { ...data.user, ...data.userProfile },
        session: data.session,
      }));
      navigate("/");
    },
    onError: (data: ApiError) => {
      const { code, statusCode } = data;
      const isInvalidCredintials =
        (statusCode === 400 && code === "invalid_credentials") ||
        (statusCode === 406 && code === "PGRST116");

      if (isInvalidCredintials) {
        const { invalidCredentials } = messages.error.auth;
        setserverErr(invalidCredentials);
      } else {
        toast.dismiss(somethingWentWrongToastId);
        toast.error(loginErrorMsg);
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
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            autoFocus
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
            className="w-full"
            disabled={isPending}
            type="submit"
          >
            تسجيل الدخول
          </Button>
        </div>
      </Form>
    </Formik>
  );
}
