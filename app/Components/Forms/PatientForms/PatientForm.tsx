import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { somethingWentWrongMsg } from "~/API/messages";
import { addPatient, getPatient, updatePatient } from "~/API/patient";
import SectionLoader from "~/Components/common/Loaders/SectionLoader";
import MainFormLayout from "~/Layouts/MainFormLayout";
import { numberOnly } from "~/lib/utils";
import type { AddPatientFormProps } from "~/types/patients";
import SubmitBtn from "../../common/SubmitBtn";
import WhatsApp from "../../icons/WhatsApp";
import CheckboxField from "../Fields/CheckboxField";
import InputField from "../Fields/InputField";
import { addPatientSchema, initialPatientValue } from "./schemas";
import { Label } from "~/Components/ui/label";

export default function PatientForm({
  setIsOpen,
  patientId,
}: AddPatientFormProps) {
  const { isFetching, isError, data } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => getPatient(patientId ?? ""),
    enabled: !!patientId,
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: patientId ? updatePatient : addPatient,
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });

  if (isFetching) return <SectionLoader />;

  if (isError)
    return (
      <p className="font-semibold text-red-500">{somethingWentWrongMsg}</p>
    );

  const patient = data?.data?.[0];

  return (
    <Formik
      initialValues={patientId ? patient! : initialPatientValue}
      validationSchema={addPatientSchema}
      onSubmit={(values) => mutate(values)}
      validateOnChange={true}
    >
      {({ values, errors }) => {
        const isTypingPhone2 = !!values.phone2;
        const phone2HasErr = errors.phone2 ?? false;
        const phone2HasWhatsappDisabled = isTypingPhone2
          ? !!phone2HasErr
          : true;

        const isTypingPhone1 = !!values.phone1;
        const phone1HasErr = errors.phone1 ?? false;
        const phone1HasWhatsappDisabled = isTypingPhone1
          ? !!phone1HasErr
          : true;

        return (
          <>
            <MainFormLayout
              submitBtn={
                <SubmitBtn
                  label={patientId ? "تعديل" : "إضافة"}
                  disabled={isPending}
                />
              }
            >
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
                hasWhatsappDisabled={phone1HasWhatsappDisabled}
              />
              <PatientPhone
                label="رقم هاتف آخر (اختياري)"
                name="phone2"
                onChange={() => {}}
                hasWhatsappDisabled={phone2HasWhatsappDisabled}
              />
              <InputField label="العنوان (اختياري)" name="address" />
            </MainFormLayout>
          </>
        );
      }}
    </Formik>
  );
}

export function PatientPhone({
  label,
  name,
  hasWhatsappDisabled,
}: {
  label: string;
  name: string;
  onChange: () => void;
  hasWhatsappDisabled?: boolean;
}) {
  return (
    <div className="flex gap-2">
      <InputField
        inputMode="numeric" // Opens numeric keyboard on mobile
        pattern="[0-9]*"
        label={label}
        name={name}
        className="w-full flex-1"
      />
      <Label
        htmlFor={`${name}_has_whatsapp`}
        className="mt-2 flex items-center gap-1.5"
      >
        <WhatsApp className="max-sm:size-5" />
        <CheckboxField
          className="max-sm:size-4"
          name={`${name}_has_whatsapp`}
          disabled={hasWhatsappDisabled}
        />
      </Label>
    </div>
  );
}
