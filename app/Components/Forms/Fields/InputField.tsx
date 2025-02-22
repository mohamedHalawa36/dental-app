import { Field } from "formik";
import Input from "~/Components/common/Input";
import type { IInputProps } from "~/types/components";

export default function InputField(props: IInputProps) {
  return <Field as={Input} {...props} />;
}
