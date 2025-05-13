import { useQuery } from "@tanstack/react-query";
import { getTodayAppointments } from "~/API/appointments";
import CardsList from "~/Components/common/CardsList";
import PageLoader from "~/Components/common/Loaders/PageLoader";
import RenderData from "~/Components/common/RenderData";
import PatientCard from "~/Components/Patient/PatientCard";
import { formatTime } from "~/lib/utils";
import { PATIENT_CARD_TYPES } from "~/types/patientCard";

export default function Home() {
  const { isFetching, data } = useQuery({
    queryKey: ["appointments"],
    queryFn: getTodayAppointments,
  });

  if (isFetching) return <PageLoader />;

  const appointments = data?.data;
  const isEmpty = appointments?.length === 0;

  return (
    <RenderData {...{ isEmpty, isFetching }}>
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
    </RenderData>
  );
}
