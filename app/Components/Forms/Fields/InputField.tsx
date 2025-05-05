import { Field, type FieldProps } from "formik";
import { cn } from "~/lib/utils";
import type { IFieldProps, IInputProps } from "~/types/components";
import FieldLayout from "./FieldLayout";
import Input from "~/Components/common/Input";

export default function InputField({
  id,
  label,
  className,
  ...restProps
}: IInputProps & IFieldProps) {
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
            error={meta.touched ? meta.error : undefined}
            className={cn(
              "w-full flex-1 rounded-xl border-none bg-transparent px-1 focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent",
            )}
          />
        </FieldLayout>
      )}
    </Field>
  );
}
