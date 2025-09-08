import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { type Dispatch, type SetStateAction } from "react";
import {
  addAppointment,
  getAppointment,
  updateAppointment,
} from "~/API/appointments";
import SectionLoader from "~/Components/common/Loaders/SectionLoader";
import SubmitBtn from "~/Components/common/SubmitBtn";
import MainFormLayout from "~/Layouts/MainFormLayout";
import type { PatientApiData } from "~/types/apiData";
import { bookApointmentSchema, initialAppointmentValues } from "./schemas";
import FormFields from "./FormFields";

type AppointmentFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  patientData?: PatientApiData;
  appointmentId?: string;
};

export default function AppointmentForm({
  setIsOpen,
  patientData,
  appointmentId,
}: AppointmentFormProps) {
  const { isFetching: isAppointmentFetching, data: appointment } = useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () => getAppointment(appointmentId ?? ""),
    enabled: !!appointmentId,
    select: (data) => data.data?.[0],
  });

  const appointmentPatient = appointmentId ? appointment?.patient : patientData;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: appointmentId ? updateAppointment : addAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
      setIsOpen(false);
    },
  });

  if (isAppointmentFetching) return <SectionLoader />;

  const patientName = appointmentPatient?.name;
  const patientId = appointmentPatient?.id;
  const initialValues = appointmentId
    ? appointment!
    : { ...initialAppointmentValues, patient_id: patientId };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={bookApointmentSchema}
      onSubmit={(values) => {
        const { availableDays, ...submitValues } = values;
        mutate(submitValues);
      }}
      validateOnChange
      enableReinitialize
    >
      <MainFormLayout
        submitBtn={
          <SubmitBtn
            label={appointmentId ? "تعديل" : "حجز"}
            disabled={isPending}
          />
        }
      >
        <FormFields patientName={patientName!} />
      </MainFormLayout>
    </Formik>
  );
}
