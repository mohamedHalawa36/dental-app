import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { getAllAppointments } from "~/API/appointments";
import CardsList from "~/Components/common/CardsList";
import { DateTimePicker } from "~/Components/common/DatePicker";
import PageLoader from "~/Components/common/Loaders/PageLoader";
import NoResultsFound from "~/Components/common/NoResultsFound";
import PatientCard from "~/Components/Patient/PatientCard";
import { SearchContext } from "~/Contexts/SearchContext";
import PageLayout from "~/Layouts/PageLayout/PageLayout";
import { formatTime } from "~/lib/utils";
import { PATIENT_CARD_TYPES } from "~/types/patientCard";

export default function appointments() {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { search } = useContext(SearchContext);

  const { isFetching, data } = useQuery({
    queryKey: ["appointments", search, date],
    queryFn: ({ signal }) =>
      getAllAppointments({ search, date: date?.toLocaleDateString() }, signal),
  });

  const appointments = data?.data;

  const filteredAppointments = search
    ? appointments?.filter((appointment) => !!appointment.patient)
    : appointments;

  return (
    <PageLayout
    // addBtn={
    //   <FormModal
    //     title="حجز موعد"
    //     isOpen={isOpen}
    //     setIsOpen={setIsOpen}
    //     trigger={<AddNew className="size-12 max-sm:size-8" />}
    //   >
    //     <AppointmentForm {...{ setIsOpen }} />
    //   </FormModal>
    // }
    >
      <div className="flex h-full flex-col gap-1">
        <div className="w-fit">
          <DateTimePicker
            granularity="day"
            value={date}
            onChange={setDate}
            className="ms-3 border-none p-0 text-lg font-medium"
          />
        </div>

        {isFetching ? (
          <PageLoader />
        ) : (
          <>
            {filteredAppointments?.length ? (
              <CardsList className="flex-1">
                {filteredAppointments?.map(({ id, patient, time, date }) => (
                  <PatientCard
                    key={id}
                    patient={patient}
                    variant={PATIENT_CARD_TYPES.APPOINTMENT}
                    {...{ time: formatTime(time), date, appointmentId: id }}
                  />
                ))}
              </CardsList>
            ) : (
              <NoResultsFound />
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
}
