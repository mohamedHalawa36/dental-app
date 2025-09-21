import ResetPasswordForm from "~/Components/Forms/ResetPassword/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(45deg,rgb(var(--secondary)),rgb(var(--primary)))] px-5">
      <div className="flex max-h-[90%] w-full flex-col gap-5 overflow-hidden rounded-[50px] bg-white pb-8 pt-3 max-sm:rounded-3xl max-sm:pb-5 lg:w-3/4 xl:w-1/2">
        <img
          src="/images/full-logo.webp"
          alt="logo"
          className="mx-auto w-48 object-contain max-sm:w-40"
        />
        <div className="my-4 flex flex-col gap-3 px-7 max-sm:px-5">
          <h2 className="text-lg font-semibold text-primary md:text-2xl">
            أهلا بك !
          </h2>
          <p className="text-secondary max-md:text-sm">
            الرجاء تغيير كلمة السر لتتمكن من الدخول إلى حسابك
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
