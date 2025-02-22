import type { ComponentProps, ReactNode } from "react";

export type IInputProps = ComponentProps<"input"> & {
  label?: string;
  icon?: ReactNode;
  error?: string;
};
