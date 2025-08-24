import { Form, Formik } from "formik";
import {
  AddAvailabilityInitialValue,
  addAvailabilitySchema,
  daysOptions,
} from "./schemas";
import MainFormLayout from "~/Layouts/MainFormLayout";
import SubmitBtn from "~/Components/common/SubmitBtn";
import InputField from "../Fields/InputField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addDoctorAvailabilty,
  updateDoctorAvailabilty,
} from "~/API/doctors_availability";
import SelectField from "../Fields/SelectField";
import type {
  AddAvailabilityData,
  updateAvailabilityData,
} from "~/types/apiData";

type NewAvailabilityFormProps = {
  doctorId: string;
  recordId?: string;
};

export default function AvailabilityForm({
  doctorId,
  recordId,
}: NewAvailabilityFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: recordId ? updateDoctorAvailabilty : addDoctorAvailabilty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });

  return (
    <Formik
      initialValues={{ ...AddAvailabilityInitialValue, doctor_id: doctorId }}
      validationSchema={addAvailabilitySchema}
      onSubmit={(values: AddAvailabilityData | updateAvailabilityData) =>
        mutate(values)
      }
    >
      {({ values, errors }) => {
        console.log(values);
        console.log(errors);
        return (
          <MainFormLayout
            submitBtn={<SubmitBtn label={"إضافة"} disabled={isPending} />}
          >
            <SelectField
              options={daysOptions}
              name="day"
              label="اليوم"
              placeholder="اختر اليوم"
            />
            <InputField label="من" name="start_time" type="time" />
            <InputField label="إلى" name="end_time" type="time" />
          </MainFormLayout>
        );
      }}
    </Formik>
  );
}
