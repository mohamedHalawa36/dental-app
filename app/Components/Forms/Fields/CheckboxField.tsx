import { useField } from "formik";
import { Checkbox } from "~/Components/ui/checkbox";

export default function CheckboxField(props: {
  name: string;
  className?: string;
  disabled?: boolean;
}) {
  const field = useField({
    ...props,
  });
  const checked = field[0].value;
  const setValue = field[2].setValue;

  return (
    <Checkbox
      id={props.name}
      checked={checked}
      onCheckedChange={(checked) => {
        setValue(checked);
      }}
      {...props}
    />
  );
}
