import { useState } from "react";
import ConfirmModal from "../common/Modals/ConfirmModal";
import Delete from "../icons/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAvailabilty } from "~/API/doctors_availability";

type DeleteAvailabilityModalProps = {
  availabilityId: number;
};

export default function DeleteAvailabilityModal({
  availabilityId,
}: DeleteAvailabilityModalProps) {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: deleteAvailabilty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor_availability"] });
    },
  });

  return (
    <ConfirmModal
      toggle={() => setIsOpen((prev) => !prev)}
      isOpen={isOpen}
      isActionsDisabled={isPending}
      title="حذف موعد"
      trigger={<Delete className="size-6 fill-red-600" />}
      confirmCallBack={() => mutate(availabilityId)}
      cancelCallBack={() => setIsOpen(false)}
    >
      <p>هل أنت متأكد من حذف هذا الموعد</p>
    </ConfirmModal>
  );
}
