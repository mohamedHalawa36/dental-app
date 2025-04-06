import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { getAllPatients } from "~/API/patient";
import { Modal } from "~/Components/common/Modal";
import NoResultsFound from "~/Components/common/NoResultsFound";
import AddPatientForm from "~/Components/Forms/AddPatientForm";
import AddNew from "~/Components/icons/AddNew";
import PatientCard from "~/Components/Patient/PatientCard";
import { SearchContext } from "~/Contexts/SearchContext";
import PageLayout from "~/Layouts/PageLayout";
import { PATIENT_CARD_TYPES } from "~/types/patientCard";

export default function patients() {
  const [isOpen, setIsOpen] = useState(false);
  const { search } = useContext(SearchContext);
  console.log("test");
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
          <Modal
            title="إضافة مريض"
            className="max-w-none lg:w-3/4 xl:w-1/2 w-10/12 max-md:max-h-[90%] md:h-fit overflow-hidden rounded-lg"
            isOpen={isOpen}
            toggle={(isOpen) => setIsOpen(isOpen ?? false)}
            trigger={
              <AddNew className="fill-foreground hover:fill-primary transition size-10 max-sm:size-8" />
            }
          >
            <AddPatientForm {...{ setIsOpen, refetch }} />
          </Modal>
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(19rem,1fr))] max-sm:px-4 p-2 gap-5 ">
          {patients && patients?.length > 0 ? (
            patients?.map((patient) => (
              <div className="snap-start">
                <PatientCard
                  key={patient.id}
                  variant={PATIENT_CARD_TYPES.PATIENT}
                  patient={patient}
                />
              </div>
            ))
          ) : (
            <NoResultsFound />
          )}
        </div>
      </div>
    </PageLayout>
  );
}
