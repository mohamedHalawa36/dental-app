import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { resetPassword, setResetedPassword } from "~/API/auth";
import Button from "~/Components/common/Button";
import InputField from "~/Components/Forms/Fields/InputField";
import { resetPasswordSchema } from "./schema";
import useAuth from "~/hooks/useAuth";
import { toast } from "sonner";

export default function ResetPasswordForm() {
  const { userId } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: async () => {
      const { error } = await setResetedPassword(userId!, true);
      if (error) {
        toast.error("لم نتمكن من تغيير كلمة السر، برجاء المحاولة مجددا");
        throw new Error(error.message);
      }

      toast.success("تم تغيير كلمة السر بنجاح");
      window.location.href = "/";
    },
  });

  return (
    <Formik
      initialValues={{
        password: "",
        confirm_password: "",
      }}
      validationSchema={resetPasswordSchema}
      onSubmit={(values) => mutate(values.password)}
    >
      <Form className="flex-1">
        <div className="flex flex-1 flex-col gap-3 overflow-auto px-7 max-sm:px-5">
          <InputField
            className="[&>div]:border-primary/50 [&>div]:transition"
            name="password"
            label="كلمة السر الجديدة"
            type="password"
            disabled={isPending}
            autoComplete="otp"
            autoFocus
          />
          <InputField
            className="[&>div]:border-primary/50 [&>div]:transition"
            name="confirm_password"
            label="تأكيد كلمة السر"
            disabled={isPending}
            type="password"
            autoComplete="otp"
          />

          <Button
            variant="primary"
            className="mt-5 w-full lg:w-fit"
            disabled={isPending}
            type="submit"
          >
            تغيير كلمة السر
          </Button>
        </div>
      </Form>
    </Formik>
  );
}
