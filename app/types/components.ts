import type {
  ComponentProps,
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";

export type FieldProps = {
  id?: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
};
export type IFieldProps = Omit<FieldProps, "children">;

export type IInputProps = ComponentProps<"input"> & {
  icon?: ReactNode;
  error?: string;
};

export type IDatePickerProps = {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  label?: string;
};

export type ModalProps = {
  title?: string | React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  toggle?: (val?: boolean) => void;
  onClose?: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
  forceModal?: boolean;
  container?: HTMLElement;
};

export type FormModalProps = {
  title: string | React.ReactNode;
  trigger?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  className?: string;
};
