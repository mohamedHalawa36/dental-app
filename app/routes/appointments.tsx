import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllAppointments } from "~/API/appointments";
import { Modal } from "~/Components/common/Modal";
import NoResultsFound from "~/Components/common/NoResultsFound";
import BookAppointmentForm from "~/Components/Forms/BookAppointmentForm";
import AddNew from "~/Components/icons/AddNew";
import PatientCard from "~/Components/Patient/PatientCard";
import PageLayout from "~/Layouts/PageLayout";
import { formatTime } from "~/lib/utils";
import { PATIENT_CARD_TYPES } from "~/types/patientCard";

export default function appointments() {
  const [isOpen, setIsOpen] = useState(false);

  const { isFetching, data } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAllAppointments,
  });

  const appointments = data?.data;

  return (
    <PageLayout
      isFetching={isFetching}
      addBtn={
        <Modal
          title="حجز موعد"
          className="max-w-none lg:w-3/4 xl:w-1/2 w-10/12 max-md:max-h-[90%] md:h-fit overflow-hidden rounded-lg"
          isOpen={isOpen}
          toggle={(isOpen) => setIsOpen(isOpen ?? false)}
          trigger={
            <AddNew className="fill-foreground hover:fill-primary transition size-12 max-sm:size-8" />
          }
        >
          <BookAppointmentForm {...{ setIsOpen }} />
        </Modal>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center max-sm:px-1 p-2 gap-y-5 max-sm:justify-evenly gap-x-8 flex-wrap ">
          {appointments?.length && appointments?.length > 0 ? (
            appointments?.map(({ patient, time, id, date }) => (
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
      </div>
    </PageLayout>
  );
}
