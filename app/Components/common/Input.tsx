import { cn } from "~/lib/utils";
import type { IInputProps } from "~/types/components";
import { Input as UiInput } from "../ui/input";
import { useEffect, useRef } from "react";

export default function Input(props: IInputProps) {
  const { icon, error, className, ...restProps } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, [inputRef]);

  return (
    <div
      ref={inputRef}
      className={cn(
        "flex h-10 items-center gap-1 rounded-xl border border-transparent bg-white px-2 transition-all focus-within:ring-1 focus-within:ring-primary",
        className,
        {
          "!border-red-500 focus-within:ring-red-500": !!error,
        },
      )}
    >
      {icon && icon}
      <UiInput
        {...restProps}
        className={cn(
          "w-full flex-1 rounded-none border-none bg-transparent px-1 py-0 text-base focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 max-md:text-sm",
        )}
      />
    </div>
  );
}
