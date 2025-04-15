import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import type { Dispatch, SetStateAction } from "react";
import { addAppointment } from "~/API/appointments";
import { getAllPatients } from "~/API/patient";
import type { Option } from "~/Components/common/Select";
import SubmitBtn from "~/Components/common/SubmitBtn";
import MainFormLayout from "~/Layouts/MainFormLayout";
import InputField from "../Fields/InputField";
import { bookApointmentSchema, initialAppointmentValues } from "./schemas";
import type { PatientApiData } from "~/types/apiData";

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
  const { isFetching, data } = useQuery({
    queryKey: ["patients-select"],
    queryFn: () => getAllPatients(),
    enabled: !appointmentId && !patientData,
  });

  const { name: patientName, id: patientId } = patientData!;
  const patients = data?.data;
  const tempOptions = [{ value: "test", label: "test" }];

  const patientsOptions: Option[] =
    patients?.map((patient) => ({
      label: patient.name,
      value: `${patient.id}`,
    })) ?? tempOptions;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
      setIsOpen(false);
    },
  });

  return (
    <div className="h-full overflow-auto px-2">
      <Formik
        initialValues={{ ...initialAppointmentValues, patient_id: patientId }}
        validationSchema={bookApointmentSchema}
        onSubmit={(values) => mutate(values)}
      >
        <Form className="flex flex-col justify-between h-full">
          <MainFormLayout>
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
          <SubmitBtn label="حجز" disabled={isPending} />
        </Form>
      </Formik>
    </div>
  );
}
