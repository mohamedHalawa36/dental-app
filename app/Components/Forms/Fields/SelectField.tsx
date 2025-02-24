import { useField } from "formik";
import { useEffect } from "react";
import Select, { type SelectProps } from "~/Components/common/Select";

export default function SelectField(props: SelectProps) {
  const [field, meta, actions] = useField({
    ...props,
  });

  const setValue = actions.setValue;
  useEffect(() => {
    const defaultVal = props.defaultValue;
    if (defaultVal) setValue(defaultVal);
  }, []);

  return (
    <Select
      error={meta.touched ? (meta.error ? meta.error : undefined) : undefined}
      {...props}
      {...field}
      onValueChange={(value) => {
        props.onValueChange(value);
        setValue(value);
      }}
    />
  );
}
