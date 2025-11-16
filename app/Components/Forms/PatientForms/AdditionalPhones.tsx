import { useEffect, useState, type ComponentProps } from "react";
import PlusCircle from "~/Components/icons/PlusCircle";
import X from "~/Components/icons/X";
import { useFormikContext } from "formik";
import PatientPhone from "./PatientPhoneField";

export default function AdditionalPhones() {
  const { setFieldValue, getFieldProps } = useFormikContext();
  const phone2 = getFieldProps("phone2").value;
  const phone3 = getFieldProps("phone3").value;
  const phone2HasWhatsapp = getFieldProps("phone2_has_whatsapp").value;
  const phone3HasWhatsapp = getFieldProps("phone3_has_whatsapp").value;

  const [showPhone2, setShowPhone2] = useState(!!phone2);
  const [showPhone3, setShowPhone3] = useState(!!phone3);

  const addPhoneEnabled = !(showPhone2 && showPhone3);

  useEffect(() => {
    if (phone2) {
      if (!phone2HasWhatsapp) setFieldValue("phone2_has_whatsapp", false);
    } else {
      setFieldValue("phone2", null);
      setFieldValue("phone2_has_whatsapp", null);
    }

    if (phone3) {
      if (!phone3HasWhatsapp) setFieldValue("phone3_has_whatsapp", false);
    } else {
      setFieldValue("phone3", null);
      setFieldValue("phone3_has_whatsapp", null);
    }
  }, [phone2, phone2HasWhatsapp, phone3, phone3HasWhatsapp, setFieldValue]);

  return (
    <>
      {showPhone2 && (
        <OptionalPhoneField
          className="w-full"
          label="هاتف إضافي 1"
          name="phone2"
          onChange={() => {}}
          optional
          onCancel={() => {
            if (phone3) {
              setFieldValue("phone2", phone3);
              setFieldValue("phone2_has_whatsapp", phone3HasWhatsapp);
              setFieldValue("phone3", null);
              setFieldValue("phone3_has_whatsapp", null);
              setShowPhone3(false);
              return;
            }

            setFieldValue("phone2", "");
            setFieldValue("phone2_has_whatsapp", null);

            if (showPhone3) return setShowPhone3(false);
            setShowPhone2(false);
          }}
        />
      )}

      {showPhone3 && (
        <OptionalPhoneField
          className="w-full"
          label="هاتف إضافي 2"
          name="phone3"
          onChange={() => {}}
          optional
          onCancel={() => {
            setShowPhone3(false);
            setFieldValue("phone3", null);
            setFieldValue("phone3_has_whatsapp", null);
          }}
        />
      )}

      {addPhoneEnabled && (
        <AddPhoneBtn
          onClick={() => {
            if (showPhone2) setShowPhone3(true);
            else setShowPhone2(true);
          }}
        />
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
