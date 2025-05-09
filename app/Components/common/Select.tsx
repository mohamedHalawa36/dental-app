// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
//   } from "@/components/select/ui/select";

import type { FC } from "react";
import { cn } from "~/lib/utils";
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type SimpleOption = {
  value: string;
  label: string;
};

export type GroupedOption = {
  label: string;
  options: SimpleOption[];
};

export type Option = SimpleOption | GroupedOption;

export type SelectProps = {
  name: string;
  options: Option[];
  placeholder: string;
  onValueChange: (value: string) => void;
  defaultValue?: string | undefined;
  className?: string;
  label: string;
  isRequired?: boolean;
  error?: string;
  isDisabled?: boolean;
};

const Select: FC<SelectProps> = ({
  options,
  onValueChange,
  defaultValue,
  placeholder,
  className,
  label,
  isRequired,
  error,
  isDisabled,
  name,
}) => {
  return (
    <div className="flex flex-col gap-1" dir="auto">
      <div className="text-text-black px-1 font-medium">
        {label}
        {isRequired && <span className="text-feedback-error ms-1">*</span>}
      </div>
      <SelectComponent
        name={name}
        onValueChange={onValueChange}
        defaultValue={defaultValue}
        disabled={isDisabled}
      >
        <SelectTrigger
          className={cn(
            "text-text-black h-11 rounded-xl border border-border bg-white px-3 py-0.5 text-base focus:outline-none focus:ring-0 focus:ring-transparent data-[placeholder]:!text-gray-400",
            {
              "border-red-600": error,
              "border-gray-200": !error,
            },
            className,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {"options" in options[0]
            ? (options as GroupedOption[]).map((option) => (
                <div key={option.label}>
                  <div className="px-2 font-semibold">{option.label}</div>
                  {option.options.map((subOption) => (
                    <SelectItem
                      value={subOption.value}
                      key={`${subOption.value}-${subOption.label}`}
                    >
                      {subOption.label}
                    </SelectItem>
                  ))}
                </div>
              ))
            : (options as SimpleOption[]).map((option) => (
                <SelectItem
                  value={option?.value}
                  key={`${option?.value}-${option?.label}`}
                >
                  {option?.label}
                </SelectItem>
              ))}
        </SelectContent>
      </SelectComponent>
      {error && error?.length > 0 && (
        <div className="text-feedback-error px-1 text-xs font-medium text-red-700">
          {error}
        </div>
      )}
    </div>
  );
};

export default Select;
