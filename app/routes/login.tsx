import LoginForm from "~/Components/Forms/LoginForm/LoginForm";

export default function login() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(45deg,rgb(var(--secondary)),rgb(var(--primary)))]">
      <div className="flex max-h-[90%] w-[25rem] flex-col gap-5 overflow-hidden rounded-[50px] bg-white pb-8 pt-3 max-sm:max-w-[90%] max-sm:rounded-3xl max-sm:pb-5">
        <img
          src="/images/full-logo.png"
          alt="logo"
          className="mx-auto w-48 object-contain max-sm:w-40"
        />
        <LoginForm />
      </div>
    </div>
  );
}
