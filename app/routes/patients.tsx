import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllPatients } from "~/API/patient";
import { Modal } from "~/Components/common/Modal";
import AddPatientForm from "~/Components/Forms/AddPatientForm";
import PatientCard from "~/Components/Patient/PatientCard";
import PageLayout from "~/Layouts/PageLayout";
import { PATIENT_CARD_TYPES } from "~/types/patientCard";

export default function patients() {
  const [isOpen, setIsOpen] = useState(false);
  const { isFetching, data } = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
  });

  const patients = data?.data;
  return (
    <PageLayout isFetching={isFetching}>
      <div className="flex flex-col gap-5">
        <div>
          <Modal
            title="إضافة مريض"
            className="max-w-none lg:w-3/4 xl:w-1/2 w-10/12 max-h-[90%] overflow-hidden rounded-lg"
            isOpen={isOpen}
            toggle={(isOpen) => setIsOpen(isOpen ?? false)}
            trigger={
              <button className="py-2 px-4 hover:text-white transition border-foreground border hover:bg-foreground w-fit rounded-xl">
                إضافة
              </button>
            }
          >
            <AddPatientForm />
          </Modal>
        </div>

        <div className="flex items-center max-sm:justify-center p-2 gap-y-5 gap-x-8 flex-wrap ">
          {patients?.map((patient) => (
            <PatientCard
              variant={PATIENT_CARD_TYPES.PATIENT}
              patient={patient}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
