import { useField } from "formik";
import { Checkbox } from "~/Components/ui/checkbox";

export default function CheckboxField(props: {
  name: string;
  className?: string;
}) {
  const field = useField({
    ...props,
  });
  const checked = field[0].checked;
  const setValue = field[2].setValue;

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(checked) => {
        setValue(checked);
      }}
      {...props}
      {...field}
    />
  );
}
