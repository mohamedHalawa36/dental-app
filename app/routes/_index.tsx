import { useQuery } from "@tanstack/react-query";
import { getTodayAppointments } from "~/API/appointments";
import CardsList from "~/Components/common/CardsList";
import NoResultsFound from "~/Components/common/NoResultsFound";
import PatientCard from "~/Components/Patient/PatientCard";
import PageLayout from "~/Layouts/PageLayout/PageLayout";
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
        <CardsList>
          {appointments?.map(
            ({ id, patient, time, date }) =>
              patient && (
                <PatientCard
                  key={id}
                  patient={patient}
                  variant={PATIENT_CARD_TYPES.APPOINTMENT}
                  {...{ time: formatTime(time), date, appointmentId: id }}
                />
              ),
          )}
        </CardsList>
      ) : (
        <NoResultsFound />
      )}
    </PageLayout>
  );
}
