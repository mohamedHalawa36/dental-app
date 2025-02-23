import { Field } from "formik";
import Input from "~/Components/common/Input";
import type { IInputProps } from "~/types/components";

export default function InputField(props: IInputProps) {
  return (
    <Field name={props.name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => <Input error={meta.touched && meta.error} {...props} {...field} />}
    </Field>
  );
}
