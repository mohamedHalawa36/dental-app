import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { getAllAppointments } from "~/API/appointments";
import CardsList from "~/Components/common/CardsList";
import { DateTimePicker } from "~/Components/common/DatePicker";
import RenderData from "~/Components/common/RenderData";
import PatientCard from "~/Components/Patient/PatientCard";
import { PageContext } from "~/Contexts/PageContext";
import { formatTime } from "~/lib/utils";
import { PATIENT_CARD_TYPES } from "~/types/patientCard";

export default function Appointments() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { search } = useContext(PageContext);

  const { isFetching, data } = useQuery({
    queryKey: ["appointments", search, date],
    queryFn: ({ signal }) =>
      getAllAppointments({ search, date: date?.toLocaleDateString() }, signal),
  });

  const appointments = data?.data ?? [];

  const filteredAppointments = search
    ? appointments?.filter((appointment) => !!appointment.patient)
    : appointments;

  const isEmpty = filteredAppointments.length === 0;

  return (
    <>
      <div className="flex h-full flex-col gap-2 py-5">
        <div className="w-fit">
          <DateTimePicker
            granularity="day"
            value={date}
            onChange={setDate}
            className="border-none p-0 text-lg font-medium max-sm:ms-2"
          />
        </div>

        <RenderData {...{ isEmpty, isFetching }}>
          <CardsList className="flex-1">
            {filteredAppointments?.map(
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
      </div>
    </>
  );
}
