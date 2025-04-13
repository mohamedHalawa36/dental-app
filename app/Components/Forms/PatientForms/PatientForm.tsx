import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { addPatient } from "~/API/patient";
import { numberOnly } from "~/lib/utils";
import type { AddPatientFormProps } from "~/types/patients";
import SubmitBtn from "../../common/SubmitBtn";
import WhatsApp from "../../icons/WhatsApp";
import CheckboxField from "../Fields/CheckboxField";
import InputField from "../Fields/InputField";
import { addPatientSchema, initialPatientValue } from "./schemas";
import MainFormLayout from "~/Layouts/MainFormLayout";

export default function PatientForm({
  setIsOpen,
  refetch,
}: AddPatientFormProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: addPatient,
    onSuccess: () => {
      setIsOpen(false);
      refetch();
    },
  });

  return (
    <div className="h-full overflow-auto px-2">
      <Formik
        initialValues={initialPatientValue}
        validationSchema={addPatientSchema}
        onSubmit={(values) => mutate(values)}
      >
        <Form>
          <MainFormLayout>
            <InputField label="الاسم" name="name" />
            <InputField
              onKeyDown={numberOnly}
              label="العمر"
              name="age"
              inputMode="numeric"
            />
            <PatientPhone
              label="رقم الهاتف"
              name="phone1"
              onChange={() => {}}
            />
            <PatientPhone
              label="رقم هاتف آخر (اختياري)"
              name="phone2"
              onChange={() => {}}
            />
            <InputField label="العنوان (اختياري)" name="address" />
          </MainFormLayout>
          <SubmitBtn label="إضافة" disabled={isPending} />
        </Form>
      </Formik>
    </div>
  );
}

export function PatientPhone({
  label,
  name,
}: {
  label: string;
  name: string;
  onChange: () => void;
}) {
  return (
    <div className="flex gap-2">
      <InputField
        inputMode="numeric" // Opens numeric keyboard on mobile
        pattern="[0-9]*"
        label={label}
        name={name}
        className="flex-1 w-full"
      />
      <div className="flex gap-1.5 items-center mt-2">
        <WhatsApp className="max-sm:size-5" />
        {/* <Field as={Checkbox} name={`phone1_has_whatsapp`} /> */}
        <CheckboxField
          className="max-sm:size-4"
          name={`${name}_has_whatsapp`}
        />
      </div>
    </div>
  );
}
