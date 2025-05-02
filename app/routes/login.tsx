import { Formik } from "formik";
import Button from "~/Components/common/Button";
import InputField from "~/Components/Forms/Fields/InputField";

export default function signup() {
  return (
    <Formik initialValues={{}}>
      <div className=" bg-[linear-gradient(45deg,rgb(var(--secondary)),rgb(var(--primary)))] h-full w-full flex justify-center items-center">
        <div className="flex flex-col gap-5 w-[25rem] bg-white max-sm:max-w-[90%] max-h-[90%] max-sm:rounded-3xl rounded-[50px] pb-8 pt-3  ">
          <img
            src="/images/full-logo.png"
            alt="logo"
            className="object-contain w-48 mx-auto max-sm:w-40"
          />
          <div className="px-7 flex-1 overflow-auto">
            <InputField
              className=" [&>div]:border-primary/50 [&>div]:focus-within:shadow [&>div]:focus-within:border-transparent [&>div]:focus-within:shadow-primary/50 [&>div]:transition"
              name="name"
              label="الاسم"
            />
            <InputField
              className=" [&>div]:border-primary/50 [&>div]:focus-within:shadow [&>div]:focus-within:border-transparent [&>div]:focus-within:shadow-primary/50 [&>div]:transition"
              name="password"
              label="كلمة السر"
            />
            <Button
              variant="primary"
              label="تسجيل الدخول"
              className="w-full mt-5"
            />
          </div>
        </div>
      </div>
    </Formik>
  );
}
