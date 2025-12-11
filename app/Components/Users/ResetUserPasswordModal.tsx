import { useEffect, useState } from "react";
import ConfirmModal from "../common/Modals/ConfirmModal";
import { useMutation } from "@tanstack/react-query";
import useAuth from "~/hooks/useAuth";
import { FormikProvider, useFormik } from "formik";
import InputField from "~/Components/Forms/Fields/InputField";
import ResetPassword from "../icons/ResetPassword";
import { resetUserPassword } from "~/API/users";
import { resetUserPasswordSchema } from "../Forms/User/schemas";

export default function ResetUserPasswordModal({ userId }: { userId: string }) {
  const { authData } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: resetUserPasswordSchema,
    onSubmit: ({ password }) =>
      mutate({ userId, password, token: authData?.session?.access_token }),
  });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    submitForm,
    values,
    resetForm,
  } = formik;

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  const { mutate, isPending } = useMutation({
    mutationFn: resetUserPassword,
    onSuccess: () => setIsOpen(false),
  });

  return (
    <ConfirmModal
      toggle={() => setIsOpen((prev) => !prev)}
      isOpen={isOpen}
      isActionsDisabled={isPending}
      title="إعادة تعيين كلمة السر"
      trigger={
        <span title="إعادة تعيين كلمة السر">
          <ResetPassword />
        </span>
      }
      confirmCallBack={submitForm}
      cancelCallBack={() => setIsOpen(false)}
      confirmLabel="تأكيد"
      cancelLabel="إلغاء"
    >
      <FormikProvider value={formik}>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-1 flex-col gap-3 overflow-auto px-1"
        >
          <InputField
            className="[&>div]:border-primary/50 [&>div]:transition"
            name="password"
            label="كلمة السر المؤقتة"
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
            label="تأكيد كلمة السر المؤقتة"
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
