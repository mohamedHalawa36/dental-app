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
    <Form className="flex h-full flex-col gap-2 px-0.5">
      <div
        className={cn(
          "grid h-full flex-1 grid-cols-2 gap-8 overflow-auto px-1 max-md:grid-cols-1 max-md:gap-2.5",
          className,
        )}
      >
        {children}
      </div>
      {submitBtn}
    </Form>
  );
}
