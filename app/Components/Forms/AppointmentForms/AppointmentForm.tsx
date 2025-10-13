import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { type Dispatch, type SetStateAction } from "react";
import {
  addAppointment,
  getAppointment,
  updateAppointment,
} from "~/API/appointments";
import SectionLoader from "~/Components/common/Loaders/SectionLoader";
import MainFormLayout from "~/Layouts/MainFormLayout";
import type { PatientApiData } from "~/types/apiData";
import { bookApointmentSchema, initialAppointmentValues } from "./schemas";
import FormFields from "./FormFields";
import LoadingError from "~/Components/common/LoadingError";

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
  const {
    isFetching: isAppointmentFetching,
    data: appointment,
    isError,
  } = useQuery({
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

  if (isError) return <LoadingError />;

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
        const { availableDays, doctor, ...submitValues } = values;
        mutate(submitValues);
      }}
      enableReinitialize
    >
      <MainFormLayout
        submitBtnLabel={appointmentId ? "تعديل" : "حجز"}
        isSubmitting={isPending}
      >
        <FormFields patientName={patientName!} />
      </MainFormLayout>
    </Formik>
  );
}
