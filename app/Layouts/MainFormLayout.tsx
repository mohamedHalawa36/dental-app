import { Form } from "formik";
import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

export default function MainFormLayout({
  children,
  className,
  submitBtn,
}: {
  children: ReactNode;
  className?: string;
  submitBtn: ReactNode;
}) {
  return (
    <Form
      className={cn(
        "grid h-full grid-cols-2 gap-8 overflow-auto pe-0.5 focus-within:overflow-hidden max-md:grid-cols-1 max-md:gap-8",
        className,
      )}
    >
      <div className="mx-1 flex flex-col gap-2">
        {children}
        {submitBtn}
      </div>
    </Form>
  );
}
