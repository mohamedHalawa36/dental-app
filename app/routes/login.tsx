import LoginForm from "~/Components/Forms/LoginForm/LoginForm";

export default function login() {
  return (
    <div className=" bg-[linear-gradient(45deg,rgb(var(--secondary)),rgb(var(--primary)))] h-full w-full flex justify-center items-center">
      <div className="flex flex-col gap-5 w-[25rem] bg-white max-sm:max-w-[90%] max-h-[90%] max-sm:rounded-3xl rounded-[50px] pb-8 pt-3  ">
        <img
          src="/images/full-logo.png"
          alt="logo"
          className="object-contain w-48 mx-auto max-sm:w-40"
        />
        <LoginForm />
      </div>
    </div>
  );
}
