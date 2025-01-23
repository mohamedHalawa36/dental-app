import { useQuery } from "@tanstack/react-query";
import { getAllPatients } from "~/API/patient";
import PatientCard from "~/Components/Patient/PatientCard";
import PageLayout from "~/Layouts/PageLayout";
import { PATIENT_CARD_TYPES } from "~/types/patientCard";

export default function patients() {
  const { isFetching, data } = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
  });

  const patients = data?.data;
  return (
    <PageLayout isFetching={isFetching}>
      <div className="flex items-center max-sm:justify-center p-2 gap-y-5 gap-x-8 flex-wrap ">
        {patients?.map((patient) => (
          <PatientCard variant={PATIENT_CARD_TYPES.PATIENT} patient={patient} />
        ))}
      </div>
    </PageLayout>
  );
}
