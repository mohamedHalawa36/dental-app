import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getAllPatients } from "~/API/patient";
import CardsList from "~/Components/common/CardsList";
import PageLoader from "~/Components/common/Loaders/PageLoader";
import FormModal from "~/Components/common/Modals/FormModal";
import RenderData from "~/Components/common/RenderData";
import PatientForm from "~/Components/Forms/PatientForms/PatientForm";
import PatientCard from "~/Components/Patient/PatientCard";
import { PageContext } from "~/Contexts/PageContext";
import { PATIENT_CARD_TYPES } from "~/types/patientCard";

export default function Patients() {
  const { search, addNewOpen, setAddNewOpen } = useContext(PageContext);

  const { isFetching, data, refetch } = useQuery({
    queryKey: ["patients", search],
    queryFn: ({ signal }) => getAllPatients(search, signal),
  });

  if (isFetching) return <PageLoader />;

  const patients = data?.data;
  const isEmpty = patients?.length === 0;

  return (
    <>
      <RenderData {...{ isEmpty, isFetching }}>
        <CardsList className="h-full">
          {patients?.map((patient) => (
            <PatientCard
              key={patient.id}
              variant={PATIENT_CARD_TYPES.PATIENT}
              patient={patient}
            />
          ))}
        </CardsList>
      </RenderData>

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
