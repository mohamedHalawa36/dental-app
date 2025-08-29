import { useState } from "react";
import FormModal from "~/Components/common/Modals/FormModal";
import AvailabilityForm from "~/Components/Forms/Availability/AvailabilityForm";
import Pencil from "../icons/Pencil";
import type { AvailabilityData } from "~/types/apiData";

type UpdateAvailabilityModalProps = {
  currAvailabilities: AvailabilityData[];
  recordId: number;
};
export default function UpdateAvailabilityModal({
  currAvailabilities,
  recordId,
}: UpdateAvailabilityModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormModal
      title="تعديل موعد"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={<Pencil className="stroke-primary" />}
    >
      <AvailabilityForm
        {...{ currAvailabilities, recordId, isOpen, setIsOpen }}
      />
    </FormModal>
  );
}
