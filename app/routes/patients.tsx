import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { getAllPatients } from "~/API/patient";
import CardsList from "~/Components/common/CardsList";
import FormModal from "~/Components/common/Modals/FormModal";
import NoResultsFound from "~/Components/common/NoResultsFound";
import PatientForm from "~/Components/Forms/PatientForms/PatientForm";
import AddNew from "~/Components/icons/AddNew";
import PatientCard from "~/Components/Patient/PatientCard";
import { SearchContext } from "~/Contexts/SearchContext";
import PageLayout from "~/Layouts/PageLayout";
import { PATIENT_CARD_TYPES } from "~/types/patientCard";

export default function patients() {
  const { search } = useContext(SearchContext);
  const [isOpen, setIsOpen] = useState(false);

  const { isFetching, data, refetch } = useQuery({
    queryKey: ["patients", search],
    queryFn: ({ signal }) => getAllPatients(search, signal),
  });
  const patients = data?.data;

  return (
    <PageLayout
      isFetching={isFetching}
      addBtn={
        <div>
          <FormModal
            title="إضافة مريض"
            trigger={
              <AddNew className="fill-foreground hover:fill-primary transition size-10 max-sm:size-8" />
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          >
            <PatientForm {...{ setIsOpen, refetch }} />
          </FormModal>
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        {patients?.length ? (
          <CardsList>
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
      </div>
    </PageLayout>
  );
}
