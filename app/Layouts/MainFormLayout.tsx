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
    <Form className="flex h-full flex-col gap-2">
      <div
        className={cn(
          "grid h-full grid-cols-2 gap-8 overflow-auto px-1.5 focus-within:overflow-hidden max-md:grid-cols-1 max-md:gap-8",
          className,
        )}
      >
        {children}
      </div>
      {submitBtn}
    </Form>
  );
}
