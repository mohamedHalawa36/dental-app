import { useQuery } from "@tanstack/react-query";
import { getTodayAppointments } from "~/API/appointments";
import NoResultsFound from "~/Components/common/NoResultsFound";
import PatientCard from "~/Components/Patient/PatientCard";
import PageLayout from "~/Layouts/PageLayout";
import { formatTime } from "~/lib/utils";
import { PATIENT_CARD_TYPES } from "~/types/patientCard";

export default function Home() {
  const { isFetching, data } = useQuery({
    queryKey: ["appointments"],
    queryFn: getTodayAppointments,
  });

  const appointments = data?.data;

  return (
    <PageLayout isFetching={isFetching}>
      {appointments?.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(19rem,1fr))] max-sm:py-0 p-2 gap-5 overflow-auto">
          {appointments?.map(
            ({ id, patient, time, date }) =>
              patient && (
                <PatientCard
                  key={id}
                  patient={patient}
                  variant={PATIENT_CARD_TYPES.APPOINTMENT}
                  {...{ time: formatTime(time), date, appointmentId: id }}
                />
              )
          )}
        </div>
      ) : (
        <NoResultsFound />
      )}
    </PageLayout>
  );
}
