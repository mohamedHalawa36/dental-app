import { Field, useFormikContext, type FieldProps } from "formik";
import Select, { type SelectProps } from "~/Components/common/Select";
import type { IFieldProps } from "~/types/components";
import FieldLayout from "./FieldLayout";

type SelectFieldProps = Omit<SelectProps, "onValueChange">;

export default function SelectField({
  id,
  name,
  label,
  className,
  ...restProps
}: SelectFieldProps & IFieldProps) {
  const { validateOnChange } = useFormikContext();
  console.log(validateOnChange);
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
            defaultValue={field.value}
            onValueChange={(value) => {
              form.setFieldValue(name, value);
              if (validateOnChange) form.setFieldTouched(name, true);
            }}
            {...restProps}
            name={field.name}
            // {...field}
          />
        </FieldLayout>
      )}
    </Field>
  );
}
