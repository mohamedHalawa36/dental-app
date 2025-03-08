import Appointment from "~/Components/icons/Appointment";
import PatientCard from "~/Components/Patient/PatientCard";
import { formatTime } from "~/lib/utils";
import type { AppointmentApiData } from "~/types/apiData";
import { PATIENT_CARD_TYPES } from "~/types/patientCard";
import AccordionItem from "../common/Accordion";
import NoResultsFound from "../common/NoResultsFound";

export default function DateGroup({
  date,
  appointments,
}: {
  date: string;
  appointments: AppointmentApiData[];
}) {
  return (
    <AccordionItem
      className="group data-[state=open]:text-primary hover:data-[state=open]:no-underline hover:data-[state=closed]:text-secondary"
      value={date}
      trigger={
        <div className="flex items-center gap-1">
          <Appointment className="size-8 group-data-[state=open]:fill-primary" />
          <h2 className="font-semibold text-xl">{date}</h2>
        </div>
      }
    >
      <div className="flex items-center max-sm:px-1 p-2 gap-y-5 max-sm:justify-evenly gap-x-8 flex-wrap ">
        {appointments.length ? (
          appointments.map(({ id, time, patient }) => (
            <PatientCard
              key={id}
              variant={PATIENT_CARD_TYPES.APPOINTMENT}
              time={formatTime(time)}
              date={date}
              patient={patient}
              appointmentId={id}
            />
          ))
        ) : (
          <NoResultsFound />
        )}
      </div>
    </AccordionItem>
  );
}
