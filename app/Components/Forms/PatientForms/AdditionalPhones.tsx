import { useState, type ComponentProps } from "react";
import PlusCircle from "~/Components/icons/PlusCircle";
import X from "~/Components/icons/X";
import { useFormikContext } from "formik";
import PatientPhone from "./PatientPhoneField";

export default function AdditionalPhones() {
  const [phoneCount, setPhoneCount] = useState(1);
  const addPhoneEnabled = phoneCount < 3;
  const phone2Enabled = phoneCount >= 2;
  const phone3Enabled = phoneCount === 3;

  const { setFieldValue } = useFormikContext();

  return (
    <>
      {phone2Enabled && (
        <OptionalPhoneField
          className="w-full"
          label="هاتف إضافي"
          name="phone2"
          onChange={() => {}}
          optional
          onCancel={() => {
            setPhoneCount((count) => count - 1);
            setFieldValue("phone2", null);
          }}
        />
      )}

      {phone3Enabled && (
        <OptionalPhoneField
          className="w-full"
          label="هاتف إضافي"
          name="phone3"
          onChange={() => {}}
          optional
          onCancel={() => {
            setPhoneCount((count) => count - 1);
            setFieldValue("phone3", null);
          }}
        />
      )}

      {addPhoneEnabled && (
        <AddPhoneBtn onClick={() => setPhoneCount((count) => count + 1)} />
      )}
    </>
  );
}

function AddPhoneBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-2 flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80"
      type="button"
      tabIndex={-1}
    >
      <PlusCircle className="size-5" />
      هاتف إضافي
    </button>
  );
}

function OptionalPhoneField({
  onCancel,
  ...props
}: ComponentProps<typeof PatientPhone> & { onCancel: () => void }) {
  return (
    <div className="flex w-full items-center gap-2">
      <PatientPhone {...props} />
      <button type="button" tabIndex={-1} onClick={onCancel}>
        <X className="mt-1.5 size-5 fill-secondary stroke-secondary" />
      </button>
    </div>
  );
}
