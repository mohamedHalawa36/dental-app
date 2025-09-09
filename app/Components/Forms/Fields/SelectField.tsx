import { useField, useFormikContext } from "formik";
import Select, { type SelectProps } from "~/Components/common/Select";
import type { IFieldProps } from "~/types/components";
import FieldLayout from "./FieldLayout";
import { useEffect } from "react";

type SelectFieldProps = Omit<SelectProps, "onValueChange">;

export default function SelectField({
  id,
  name,
  label,
  className,
  ...restProps
}: SelectFieldProps & IFieldProps) {
  const { validateForm } = useFormikContext();
  const [field, meta, form] = useField(name);

  const value = field.value;

  useEffect(() => {
    validateForm();
  }, [validateForm, value]);

  return (
    <FieldLayout
      id={id}
      label={label as string}
      error={meta.touched ? meta.error : undefined}
      className={className}
    >
      <Select
        className="w-full rounded-xl border-primary/70 bg-transparent px-2 text-sm"
        error={meta.touched ? (meta.error ? meta.error : undefined) : undefined}
        defaultValue={field.value}
        onValueChange={(value) => {
          form.setValue(value);
          form.setTouched(true);
        }}
        {...restProps}
        name={field.name}
        // {...field}
      />
    </FieldLayout>
  );
}
