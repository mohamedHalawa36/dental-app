import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import type { Dispatch, SetStateAction } from "react";
import {
  addAppointment,
  getAppointment,
  updateAppointment,
} from "~/API/appointments";
import { getAllPatients } from "~/API/patient";
import SectionLoader from "~/Components/common/Loaders/SectionLoader";
import SubmitBtn from "~/Components/common/SubmitBtn";
import MainFormLayout from "~/Layouts/MainFormLayout";
import type { PatientApiData } from "~/types/apiData";
import InputField from "../Fields/InputField";
import { bookApointmentSchema, initialAppointmentValues } from "./schemas";

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
  const { isFetching: isPatientsFetching, data: patients } = useQuery({
    queryKey: ["patients-select"],
    queryFn: () => getAllPatients(),
    enabled: !appointmentId,
    select: (data) => data.data,
  });

  const { isFetching: isAppointmentFetching, data: appointment } = useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () => getAppointment(appointmentId ?? ""),
    enabled: !!appointmentId,
    select: (data) => data.data?.[0],
  });

  const appointmentPatient = appointmentId ? appointment?.patient : patientData;

  const tempOptions = [{ value: "test", label: "test" }];

  const patientsOptions =
    patients?.map((patient) => ({
      label: patient.name,
      value: `${patient.id}`,
    })) ?? tempOptions;

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
      onSubmit={(values) => mutate(values)}
    >
      <MainFormLayout
        submitBtn={
          <SubmitBtn
            label={appointmentId ? "تعديل" : "حجز"}
            disabled={isPending}
          />
        }
      >
        <InputField
          label="اسم المريض"
          name="patientId"
          value={patientName}
          defaultValue={patientName}
          disabled={true}
          className="[&>div>input]:!opacity-100"
        />

        <InputField label="التاريخ" name="date" type="date" />
        <InputField label="الوقت" name="time" type="time" />
      </MainFormLayout>
    </Formik>
  );
}
