import { cn } from "~/lib/utils";
import type { IInputProps } from "~/types/components";
import { Input as UiInput } from "../ui/input";

export default function Input(props: IInputProps) {
  const { icon, error, className, ...restProps } = props;

  return (
    <div
      className={cn(
        "flex items-center gap-2 h-10 bg-white rounded-xl px-2 ring-offset-background data-[placeholder]:!text-grey-grey1 text-text-black focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border border-transparent",
        {
          "!border-red-500": !!error,
        },
        className
      )}
    >
      {icon && icon}
      <UiInput
        {...restProps}
        className={cn(
          "rounded-xl bg-transparent focus-visible:outline-none focus-visible:ring-0 border-none focus-visible:border-none focus-visible:ring-transparent px-1 w-full flex-1 "
        )}
      />
    </div>
  );
}
