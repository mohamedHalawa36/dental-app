import type { ComponentProps, ReactNode } from "react";
import { cn } from "~/lib/utils";
import { Input as UiInput } from "../ui/input";

type IInputProps = ComponentProps<"input"> & {
  label?: string;
  icon?: ReactNode;
  error?: string;
};
export default function Input(props: IInputProps) {
  const { label, icon, error, className, ...restProps } = props;
  let a = 0;
  return (
    <div className="flex flex-col gap-1 ">
      {label && (
        <label className="" htmlFor={props.id}>
          {label}
        </label>
      )}

      <div className="flex items-center gap-2 border-border border bg-white rounded-xl px-3 py-0.5 ring-offset-background data-[placeholder]:!text-grey-grey1 text-text-black focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        {icon && icon}
        <UiInput
          {...restProps}
          className={cn(
            "rounded-xl bg-transparent focus-visible:outline-none focus-visible:ring-0 border-none focus-visible:border-none focus-visible:ring-offset-transparent focus-visible:ring-transparent p-0",
            className
          )}
        />
      </div>
      {error && <span className="text-red-600 text-xs">{error}</span>}
    </div>
  );
}
