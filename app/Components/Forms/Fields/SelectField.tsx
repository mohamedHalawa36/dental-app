import { Field, type FieldProps } from "formik";
import Select, { type SelectProps } from "~/Components/common/Select";
import type { IFieldProps } from "~/types/components";
import FieldLayout from "./FieldLayout";

export default function SelectField({
  id,
  name,
  label,
  className,
  ...restProps
}: SelectProps & IFieldProps) {
  return (
    <Field name={name}>
      {({ field, meta, form }: FieldProps) => (
        <FieldLayout
          id={id}
          label={label as string}
          error={meta.touched ? meta.error : undefined}
          className={className}
        >
          <Select
            className="w-full rounded-xl border-primary/70 bg-transparent px-2 text-sm"
            error={
              meta.touched ? (meta.error ? meta.error : undefined) : undefined
            }
            {...restProps}
            {...field}
            onValueChange={(value) => form.setFieldValue(name, value)}
          />
        </FieldLayout>
      )}
    </Field>
  );
}
