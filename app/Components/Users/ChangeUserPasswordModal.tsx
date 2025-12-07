import { useEffect, useState } from "react";
import ConfirmModal from "../common/Modals/ConfirmModal";
import { useMutation } from "@tanstack/react-query";
import useAuth from "~/hooks/useAuth";
import { FormikProvider, useFormik } from "formik";
import InputField from "~/Components/Forms/Fields/InputField";
import { changePasswordSchema } from "../Forms/User/schemas";
import { changeUserPassword, logoutUser } from "~/API/auth";
import type { ApiError } from "~/API/supabase";
import { useNavigate } from "react-router";

export default function ChangeUserPasswordModal() {
  const { authData } = useAuth();
  const userEmail = authData?.user?.email;

  const [isOpen, setIsOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      current_password: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: ({ current_password, password }) =>
      mutate({ email: userEmail!, current_password, password }),
  });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    submitForm,
    values,
    resetForm,
    setFieldError,
  } = formik;

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: changeUserPassword,
    onSuccess: async () => {
      await logoutUser();
      navigate("/");
      setIsOpen(false);
    },
    onError: (data: ApiError) => {
      const { code, statusCode } = data;
      const isInvalidCredintials =
        (statusCode === 400 && code === "invalid_credentials") ||
        (statusCode === 406 && code === "PGRST116");

      if (isInvalidCredintials) {
        setFieldError("current_password", "كلمة المرور الحالية غير صحيحة");
      }
    },
  });

  return (
    <ConfirmModal
      toggle={() => setIsOpen((prev) => !prev)}
      isOpen={isOpen}
      isActionsDisabled={isPending}
      title="إعادة تعيين كلمة السر"
      trigger={
        <span className="text-lg font-semibold text-primary underline-offset-8 hover:underline">
          تغيير كلمة السر
        </span>
      }
      confirmCallBack={submitForm}
      cancelCallBack={() => setIsOpen(false)}
      confirmLabel="تأكيد"
    >
      <FormikProvider value={formik}>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-1 flex-col gap-3 overflow-auto px-1"
        >
          <InputField
            className="[&>div]:border-primary/50 [&>div]:transition"
            name="current_password"
            label="كلمة السر الحالية"
            type="password"
            disabled={isPending}
            autoComplete="one-time-code"
            autoFocus
            value={values.current_password}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <InputField
            className="[&>div]:border-primary/50 [&>div]:transition"
            name="password"
            label="كلمة السر الجديدة"
            type="password"
            disabled={isPending}
            autoComplete="one-time-code"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <InputField
            className="[&>div]:border-primary/50 [&>div]:transition"
            name="confirm_password"
            label="تأكيد كلمة السر الجديدة"
            type="password"
            disabled={isPending}
            autoComplete="one-time-code"
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </form>
      </FormikProvider>
    </ConfirmModal>
  );
}
