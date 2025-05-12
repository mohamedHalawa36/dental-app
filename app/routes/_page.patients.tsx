import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getAllPatients } from "~/API/patient";
import CardsList from "~/Components/common/CardsList";
import PageLoader from "~/Components/common/Loaders/PageLoader";
import FormModal from "~/Components/common/Modals/FormModal";
import NoResultsFound from "~/Components/common/NoResultsFound";
import PatientForm from "~/Components/Forms/PatientForms/PatientForm";
import PatientCard from "~/Components/Patient/PatientCard";
import { PageContext } from "~/Contexts/PageContext";
import { PATIENT_CARD_TYPES } from "~/types/patientCard";

export default function patients() {
  const { search, addNewOpen, setAddNewOpen } = useContext(PageContext);

  const { isFetching, data, refetch } = useQuery({
    queryKey: ["patients", search],
    queryFn: ({ signal }) => getAllPatients(search, signal),
  });
  const patients = data?.data;

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

      <FormModal
        title="إضافة مريض"
        isOpen={addNewOpen}
        setIsOpen={setAddNewOpen}
        className=""
      >
        <PatientForm {...{ setIsOpen: setAddNewOpen, refetch }} />
      </FormModal>
    </>
  );
}
