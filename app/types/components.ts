import type { ComponentProps, ReactNode } from "react";

export type IInputProps = ComponentProps<"input"> & {
  label?: string;
  icon?: ReactNode;
  error?: string;
};

export type IDatePickerProps = {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  label?: string;
};
