import { Field, type FieldProps } from "formik";
import { useRef, useState } from "react";
import Input from "~/Components/common/Input";
import { cn } from "~/lib/utils";
import type { IFieldProps, IInputProps } from "~/types/components";
import FieldLayout from "./FieldLayout";
import ShowPasswordBtn from "./ShowPasswordBtn";

export default function InputField({
  id,
  label,
  className,
  type,
  optional,
  icon,
  placeholder,
  ...restProps
}: IInputProps & IFieldProps) {
  const [inputType, setinputType] = useState(type);
  const isPasswordType = type === "password";
  const handleTogglePassword = () => {
    if (inputType === "password") setinputType("text");
    else setinputType("password");
  };

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Field name={restProps.name}>
      {({ field, meta }: FieldProps) => (
        <FieldLayout
          id={id}
          label={label as string}
          error={meta.touched ? meta.error : undefined}
          className={className}
          optional={optional}
        >
          <Input
            ref={inputRef}
            onFocus={(e) => {
              e.preventDefault();
              const input = e.target;
              input.focus({ preventScroll: true });
            }}
            {...restProps}
            {...field}
            icon={
              isPasswordType ? (
                <ShowPasswordBtn
                  isShown={inputType === "text"}
                  handleClick={handleTogglePassword}
                />
              ) : (
                icon
              )
            }
            type={inputType}
            error={meta.touched ? meta.error : undefined}
            className={cn(
              "w-full rounded-xl border-primary/70 bg-transparent px-1 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent",
            )}
            placeholder={placeholder || label || ""}
            tabIndex={0}
          />
        </FieldLayout>
      )}
    </Field>
  );
}
