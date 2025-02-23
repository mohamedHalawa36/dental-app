import { useQuery } from "@tanstack/react-query";
import { getAllAppointments } from "~/API/appointments";
import PatientCard from "~/Components/Patient/PatientCard";
import PageLayout from "~/Layouts/PageLayout";
import { formatTime } from "~/lib/utils";
import { PATIENT_CARD_TYPES } from "~/types/patientCard";

export default function appointments() {
  const { isFetching, data } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAllAppointments,
  });

  const appointments = data?.data;

  return (
    <PageLayout isFetching={isFetching}>
      <div className="flex items-center max-sm:justify-center p-2 gap-y-5 gap-x-8 flex-wrap ">
        {appointments?.map(({ patient, time }) => (
          <PatientCard
            variant={PATIENT_CARD_TYPES.APPOINTMENT}
            time={formatTime(time)}
            patient={patient}
          />
        ))}
      </div>
    </PageLayout>
  );
}
