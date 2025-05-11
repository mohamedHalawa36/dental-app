import { Field, type FieldProps } from "formik";
import { cn } from "~/lib/utils";
import type { IFieldProps, IInputProps } from "~/types/components";
import FieldLayout from "./FieldLayout";
import Input from "~/Components/common/Input";
import { useState } from "react";
import ShowPasswordBtn from "./ShowPasswordBtn";

export default function InputField({
  id,
  label,
  className,
  type,
  icon,
  ...restProps
}: IInputProps & IFieldProps) {
  const [inputType, setinputType] = useState(type);
  const isPasswordType = type === "password";
  const handleTogglePassword = () => {
    if (inputType === "password") setinputType("text");
    else setinputType("password");
  };

  return (
    <Field name={restProps.name}>
      {({ field, meta }: FieldProps) => (
        <FieldLayout
          id={id}
          label={label as string}
          error={meta.touched ? meta.error : undefined}
          className={className}
        >
          <Input
            {...restProps}
            {...field}
            icon={
              isPasswordType ? (
                <ShowPasswordBtn
                  isShown={inputType === "text"}
                  handleClick={handleTogglePassword}
                  disabled={!field.value}
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
          />
        </FieldLayout>
      )}
    </Field>
  );
}
