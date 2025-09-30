import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { getAllAppointments, getDoctorAppointments } from "~/API/appointments";
import CardsList from "~/Components/common/CardsList";
import { DateTimePicker } from "~/Components/common/DatePicker";
import RenderData from "~/Components/common/RenderData";
import Doctor from "~/Components/icons/Doctor";
import PatientCard from "~/Components/Patient/PatientCard";
import { PageContext } from "~/Contexts/PageContext";
import useAuth from "~/hooks/useAuth";
import { formatApiDate, formatTime } from "~/lib/utils";
import { PATIENT_CARD_TYPES } from "~/types/patientCard";

export default function Appointments() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { search } = useContext(PageContext);
  const { isDoctor, isAdmin, userId } = useAuth();
  const isRegularDoctor = isDoctor && !isAdmin;

  const { isFetching, data, isError } = useQuery({
    queryKey: ["appointments", search, date],
    queryFn: ({ signal }) =>
      isRegularDoctor
        ? getDoctorAppointments(
            { search, date: formatApiDate(date), doctorId: userId! },
            signal,
          )
        : getAllAppointments({ search, date: formatApiDate(date) }, signal),
  });

  const appointments = data?.data ?? [];

  const filteredAppointments = search
    ? appointments?.filter((appointment) => !!appointment.patient)
    : appointments;

  const isEmpty = filteredAppointments.length === 0;

  const doctorsNames = [
    ...new Set(
      filteredAppointments.map((appointment) => appointment.doctor.name),
    ),
  ];

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
        <RenderData {...{ isEmpty, isFetching, isError }}>
          <div className="overflow-auto">
            {doctorsNames.map((doctorName, i) => (
              <div className="my-4 flex flex-col gap-4" key={doctorName + i}>
                <div className="flex items-center gap-1">
                  <Doctor className="size-8" />
                  <h4 className="font-semibold lg:text-lg">د/ {doctorName}</h4>
                </div>
                <CardsList className="flex-1">
                  {filteredAppointments
                    ?.filter(
                      (appointment) => appointment.doctor.name === doctorName,
                    )
                    ?.map(
                      ({ id, patient, time, date, doctor }) =>
                        patient && (
                          <PatientCard
                            key={id}
                            patient={patient}
                            doctor={doctor}
                            variant={PATIENT_CARD_TYPES.APPOINTMENT}
                            {...{
                              time: formatTime(time),
                              date,
                              appointmentId: id,
                            }}
                          />
                        ),
                    )}
                </CardsList>
              </div>
            ))}
          </div>
        </RenderData>
      </div>
    </>
  );
}
