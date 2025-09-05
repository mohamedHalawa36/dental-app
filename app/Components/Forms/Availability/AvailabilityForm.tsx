import { Formik } from "formik";
import {
  AddAvailabilityInitialValue,
  addAvailabilitySchema,
  daysOptions,
  updateAvailabilitySchema,
} from "./schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addDoctorAvailabilty,
  getOneAvailability,
  updateDoctorAvailabilty,
} from "~/API/doctors_availability";
import type {
  AddAvailabilityData,
  AvailabilityData,
  updateAvailabilityData,
} from "~/types/apiData";
import { type Dispatch, type SetStateAction } from "react";
import useAuth from "~/hooks/useAuth";
import PageLoader from "~/Components/common/Loaders/PageLoader";
import MainFormLayout from "~/Layouts/MainFormLayout";
import SubmitBtn from "~/Components/common/SubmitBtn";
import SelectField from "../Fields/SelectField";
import InputField from "../Fields/InputField";

type AvailabilityFormProps = {
  recordId?: number;
  currAvailabilities: AvailabilityData[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AvailabilityForm({
  recordId,
  currAvailabilities,
  setIsOpen,
}: AvailabilityFormProps) {
  const queryClient = useQueryClient();

  const { userId } = useAuth();

  const { data, isLoading: isDataLoading } = useQuery({
    enabled: !!recordId,
    queryKey: ["availability", recordId],
    queryFn: () => getOneAvailability(userId!, recordId!),
  });

  const recordData = data?.data?.[0];

  const { mutate, isPending } = useMutation({
    mutationFn: recordId ? updateDoctorAvailabilty : addDoctorAvailabilty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor_availability"] });
    },
    onSettled: () => setIsOpen(false),
  });

  if (isDataLoading) return <PageLoader />;

  return (
    <Formik
      initialValues={{
        ...(!recordId ? AddAvailabilityInitialValue : recordData!),
        doctor_id: userId!,
      }}
      validationSchema={
        !recordId
          ? addAvailabilitySchema(currAvailabilities)
          : updateAvailabilitySchema
      }
      onSubmit={(values: AddAvailabilityData | updateAvailabilityData) =>
        mutate(values)
      }
      validateOnChange
    >
      {() => {
        return (
          <MainFormLayout
            submitBtn={
              <SubmitBtn
                label={!recordId ? "إضافة" : "تعديل"}
                disabled={isPending}
              />
            }
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
