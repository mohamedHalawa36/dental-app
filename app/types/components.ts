import type {
  ComponentProps,
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";

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
