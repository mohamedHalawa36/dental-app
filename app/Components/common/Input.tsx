import { cn } from "~/lib/utils";
import type { IInputProps } from "~/types/components";
import { Input as UiInput } from "../ui/input";

export default function Input(props: IInputProps) {
  const { label, icon, error, className, ...restProps } = props;

  return (
    <div className={cn("flex flex-col gap-1 ", className)}>
      {label && (
        <label className="" htmlFor={props.id}>
          {label}
        </label>
      )}

      <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-0.5 ring-offset-background data-[placeholder]:!text-grey-grey1 text-text-black focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        {icon && icon}
        <UiInput
          {...restProps}
          className={cn(
            "rounded-xl bg-transparent focus-visible:outline-none focus-visible:ring-0 border-none focus-visible:border-none focus-visible:ring-offset-transparent focus-visible:ring-transparent p-0 w-full flex-1 "
          )}
        />
      </div>
      <span className="text-red-700 text-xs h-4">{error}</span>
    </div>
  );
}
