import { Field } from "formik";
import Select, { type SelectProps } from "~/Components/common/Select";

export default function SelectField(props: SelectProps) {
  return (
    <Field name={props.name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => <Select error={meta.touched && meta.error} {...props} {...field} />}
    </Field>
  );
}
