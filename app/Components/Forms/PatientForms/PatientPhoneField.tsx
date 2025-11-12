import { cn, numberOnly } from "~/lib/utils";
import WhatsApp from "../../icons/WhatsApp";
import CheckboxField from "../Fields/CheckboxField";
import InputField from "../Fields/InputField";
import { Label } from "~/Components/ui/label";
import { useFormikContext } from "formik";

type PatientPhoneProps = {
  label: string;
  name: string;
  onChange: () => void;
  className?: string;
  optional?: boolean;
};

export default function PatientPhone({
  label,
  name,
  className,
  optional,
}: PatientPhoneProps) {
  const { getFieldProps, getFieldMeta } = useFormikContext();
  const { value } = getFieldProps(name);
  const { error } = getFieldMeta(name);
  const isTypingPhone = !!value;
  const phoneHasErr = error ?? false;
  const phoneHasWhatsappDisabled = isTypingPhone ? !!phoneHasErr : true;

  return (
    <div className={cn("flex gap-2", className)}>
      <InputField
        inputMode="numeric" // Opens numeric keyboard on mobile
        pattern="[0-9]*"
        label={label}
        name={name}
        className="w-full flex-1"
        optional={optional}
        onKeyDown={numberOnly}
      />
      <Label
        htmlFor={`${name}_has_whatsapp`}
        className="mt-2 flex items-center gap-1.5"
      >
        <WhatsApp className="max-sm:size-5" />
        <CheckboxField
          className="max-sm:size-4"
          name={`${name}_has_whatsapp`}
          disabled={phoneHasWhatsappDisabled}
        />
      </Label>
    </div>
  );
}
