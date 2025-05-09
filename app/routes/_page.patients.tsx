import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { getAllPatients } from "~/API/patient";
import CardsList from "~/Components/common/CardsList";
import PageLoader from "~/Components/common/Loaders/PageLoader";
import NoResultsFound from "~/Components/common/NoResultsFound";
import PatientCard from "~/Components/Patient/PatientCard";
import { SearchContext } from "~/Contexts/SearchContext";
import { PATIENT_CARD_TYPES } from "~/types/patientCard";

export default function patients() {
  const { search } = useContext(SearchContext);
  const [isOpen, setIsOpen] = useState(false);

  const { isFetching, data, refetch } = useQuery({
    queryKey: ["patients", search],
    queryFn: ({ signal }) => getAllPatients(search, signal),
  });
  const patients = data?.data;
  console.log(search);

  if (isFetching) return <PageLoader />;

  return (
    <>
      {patients?.length ? (
        <CardsList className="h-full">
          {patients?.map((patient) => (
            <PatientCard
              key={patient.id}
              variant={PATIENT_CARD_TYPES.PATIENT}
              patient={patient}
            />
          ))}
        </CardsList>
      ) : (
        <NoResultsFound />
      )}
    </>
  );
}
