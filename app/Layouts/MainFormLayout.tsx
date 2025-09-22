import { Form, useFormikContext } from "formik";
import type { ReactNode } from "react";
import PageLoader from "~/Components/common/Loaders/PageLoader";
import SubmitBtn from "~/Components/common/SubmitBtn";
import { cn } from "~/lib/utils";

type MainFormLayoutProps = {
  children: ReactNode;
  className?: string;
  isSubmitting: boolean;
  submitBtnLabel: string;
};

export default function MainFormLayout({
  children,
  className,
  submitBtnLabel,
  isSubmitting,
}: MainFormLayoutProps) {
  const { dirty } = useFormikContext();
  return (
    <Form className="flex h-full flex-col gap-2 px-0.5">
      <div
        className={cn(
          "relative grid h-full flex-1 grid-cols-2 gap-8 overflow-auto px-1 max-md:grid-cols-1 max-md:gap-2.5",
          className,
        )}
      >
        {isSubmitting && (
          <PageLoader className="absolute inset-0 m-0 size-full bg-slate-100/70" />
        )}
        {children}
      </div>
      <SubmitBtn label={submitBtnLabel} disabled={!dirty || isSubmitting} />
    </Form>
  );
}
