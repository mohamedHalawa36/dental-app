import { useQuery } from "@tanstack/react-query";
import { getAllAppointments } from "~/API/appointments";
import CardsList from "~/Components/common/CardsList";
import RenderData from "~/Components/common/RenderData";
import PatientCard from "~/Components/Patient/PatientCard";
import usePageContext from "~/hooks/usePageContext";
import { formatApiDate, formatTime } from "~/lib/utils";
import { PATIENT_CARD_TYPES } from "~/types/patientCard";

export default function Home() {
  const { search } = usePageContext();

  const todayDate = new Date();
  const { isFetching, data, isError } = useQuery({
    queryKey: ["appointments", search, "today"],
    queryFn: ({ signal }) =>
      getAllAppointments({ search, date: formatApiDate(todayDate) }, signal),
  });

  const appointments = data?.data ?? [];

  const filteredAppointments = search
    ? appointments?.filter((appointment) => !!appointment.patient)
    : appointments;

  const isEmpty = filteredAppointments.length === 0;

  return (
    <RenderData {...{ isEmpty, isFetching, isError }}>
      <CardsList className="h-full">
        {appointments?.map(
          ({ id, patient, time, date, doctor }) =>
            patient && (
              <PatientCard
                doctor={doctor}
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
