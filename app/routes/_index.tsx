import { useQuery } from "@tanstack/react-query";
import { getTodayAppointments } from "~/API/appointments";
import PatientCard from "~/Components/Patient/PatientCard";
import PageLayout from "~/Layouts/PageLayout";
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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(19rem,1fr))] max-sm:px-4 p-2 gap-5 ">
        {appointments?.length && appointments?.length > 0 ? (
          appointments?.map(({ patient, time, id }) => (
            <PatientCard
              key={id}
              variant={PATIENT_CARD_TYPES.APPOINTMENT}
              time={formatTime(time)}
              patient={patient}
              appointmentId={id}
            />
          ))
        ) : (
          <p className="text-2xl max-sm:text-base text-center text-slate-500 flex-1">
            لا توجد مواعيد
          </p>
        )}
      </div>
    </PageLayout>
  );
}
