import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import type { Dispatch, SetStateAction } from "react";
import { addAppointment } from "~/API/appointments";
import { getAllPatients } from "~/API/patient";
import type { Option } from "~/Components/common/Select";
import SubmitBtn from "~/Components/common/SubmitBtn";
import MainFormLayout from "~/Layouts/MainFormLayout";
import { cn } from "~/lib/utils";
import InputField from "../Fields/InputField";
import SelectField from "../Fields/SelectField";
import { bookApointmentSchema, initialAppointmentValues } from "./schemas";

export default function AppointmentForm({
  setIsOpen,
  patientId,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  refetch?: () => void;
  patientId?: string;
}) {
  const { isFetching, data } = useQuery({
    queryKey: ["patients-select"],
    queryFn: () => getAllPatients(),
  });

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
        initialValues={initialAppointmentValues}
        validationSchema={bookApointmentSchema}
        onSubmit={(values) => mutate(values)}
      >
        <Form className="flex flex-col justify-between h-full">
          <MainFormLayout>
            <SelectField
              className={cn(
                "disabled:text-primary disabled:opacity-70 disabled:[&>svg]:hidden",
                {
                  "[&>svg]:hidden": !!patientId,
                }
              )}
              isDisabled={!!patientId || isFetching}
              label="المريض"
              name="patient_id"
              options={patientsOptions}
              placeholder="اختر مريض"
              onValueChange={() => {}}
              defaultValue={patientId}
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
