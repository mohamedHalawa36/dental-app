import { cn } from "~/lib/utils";
import type { IInputProps } from "~/types/components";
import { Input as UiInput } from "../ui/input";

export default function Input(props: IInputProps) {
  const { icon, error, className, ...restProps } = props;

  return (
    <div
      className={cn(
        "data-[placeholder]:!text-grey-grey1 text-text-black flex h-10 items-center gap-2 rounded-xl border border-transparent bg-white px-2 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className,
        {
          "!border-red-500": !!error,
        },
      )}
    >
      {icon && icon}
      <UiInput
        {...restProps}
        className={cn(
          "w-full flex-1 rounded-xl border-none bg-transparent px-1 focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent",
        )}
      />
    </div>
  );
}
