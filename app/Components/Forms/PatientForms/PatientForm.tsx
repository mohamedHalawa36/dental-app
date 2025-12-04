import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { addPatient, getPatient, updatePatient } from "~/API/patient";
import SectionLoader from "~/Components/common/Loaders/SectionLoader";
import MainFormLayout from "~/Layouts/MainFormLayout";
import { isMobileDevice, numberOnly } from "~/lib/utils";
import type { AddPatientFormProps } from "~/types/patients";
import InputField from "../Fields/InputField";
import { addPatientSchema, initialPatientValue } from "./schemas";
import LoadingError from "~/Components/common/LoadingError";
import AdditionalPhones from "./AdditionalPhones";
import PatientPhone from "./PatientPhoneField";

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

  if (isError) return <LoadingError />;

  const patient = data?.data;

  return (
    <Formik
      initialValues={patientId ? patient! : initialPatientValue}
      validationSchema={addPatientSchema}
      onSubmit={(values) => mutate(values)}
      validateOnChange={true}
    >
      <>
        <MainFormLayout
          isSubmitting={isPending}
          submitBtnLabel={patientId ? "تعديل" : "إضافة"}
        >
          <InputField label="الاسم" name="name" autoFocus={!isMobileDevice()} />
          <InputField
            onKeyDown={numberOnly}
            label="العمر"
            name="age"
            inputMode="numeric"
          />
          <PatientPhone label="رقم الهاتف" name="phone1" onChange={() => {}} />
          <AdditionalPhones />
          <InputField label="العنوان" name="address" optional />
        </MainFormLayout>
      </>
    </Formik>
  );
}
