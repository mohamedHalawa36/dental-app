import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { getAllAppointments } from "~/API/appointments";
import { DatePicker } from "~/Components/common/DatePicker";
import { Modal } from "~/Components/common/Modal";
import PageLoader from "~/Components/common/PageLoader";
import BookAppointmentForm from "~/Components/Forms/BookAppointmentForm";
import AddNew from "~/Components/icons/AddNew";
import PatientCard from "~/Components/Patient/PatientCard";
import { SearchContext } from "~/Contexts/SearchContext";
import PageLayout from "~/Layouts/PageLayout";
import { formatTime } from "~/lib/utils";
import { PATIENT_CARD_TYPES } from "~/types/patientCard";

export default function appointments() {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
  const { search } = useContext(SearchContext);

  const { isFetching, data } = useQuery({
    queryKey: ["appointments", search, date],
    queryFn: ({ signal }) => getAllAppointments({ search, date }, signal),
  });

  const appointments = data?.data;

  console.log(date);

  return (
    <PageLayout
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
      <div className="h-full flex flex-col ">
        <DatePicker {...{ date, setDate }} className="p-0 border-none" />
        {isFetching ? (
          <PageLoader />
        ) : (
          <div className="flex max-sm:px-2 p-2 gap-5 flex-wrap overflow-y-auto ">
            {appointments?.length ? (
              appointments?.map(({ id, patient, time, date }) => (
                <PatientCard
                  key={id}
                  patient={patient}
                  variant={PATIENT_CARD_TYPES.APPOINTMENT}
                  {...{ time: formatTime(time), date, appointmentId: id }}
                />
              ))
            ) : (
              <p className="w-full text-center font-medium text-slate-500 max-sm:text-lg text-2xl">
                لا توجد مواعيد
              </p>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
