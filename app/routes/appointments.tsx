import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllAppointments } from "~/API/appointments";
import DateGroup from "~/Components/Appointments/DateGroup";
import { Modal } from "~/Components/common/Modal";
import BookAppointmentForm from "~/Components/Forms/BookAppointmentForm";
import AddNew from "~/Components/icons/AddNew";
import { Accordion } from "~/Components/ui/accordion";
import PageLayout from "~/Layouts/PageLayout";
import type { AppointmentApiData } from "~/types/apiData";

export default function appointments() {
  const [isOpen, setIsOpen] = useState(false);

  const { isFetching, data } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAllAppointments,
  });

  const appointments = data?.data;
  const dateGroups: { [key in string]: AppointmentApiData[] } = {};
  appointments?.forEach((appointment) => {
    const { date } = appointment;
    if (!dateGroups[date]) dateGroups[date] = [];
    dateGroups[date].push(appointment);
  });

  const dates = Object.keys(dateGroups);

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
        <div className="flex flex-col divide-y divide-border ">
          <Accordion type="single" collapsible>
            {dates.length > 0 &&
              dates.map((date) => {
                const appointments = dateGroups[date];
                return <DateGroup {...{ date, appointments }} />;
              })}
          </Accordion>
        </div>
      </div>
    </PageLayout>
  );
}
