import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteAppointment } from "~/API/appointments";
import DeleteAppointmentModal from "~/Components/Appointments/DeleteAppointmentModal";
import { Modal } from "~/Components/common/Modal";

export default function CancelAppointmentBtn({
  appointmentId,
  patientName,
}: {
  appointmentId: string;
  patientName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation<unknown, unknown, string>({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });

  return (
    <Modal
      title="إلغاء موعد"
      className="h-fit w-11/12 overflow-hidden rounded-lg md:w-2/5 lg:w-[25.5rem]"
      isOpen={isOpen}
      toggle={(isOpen) => setIsOpen(isOpen ?? false)}
      trigger={
        <div className="h-fit rounded-xl border border-secondary px-5 py-2 text-sm font-medium text-secondary transition hover:bg-secondary hover:text-white">
          إلغاء
        </div>
      }
    >
      <DeleteAppointmentModal
        yesCallBack={() => mutate(appointmentId)}
        noCallBack={() => setIsOpen(false)}
        patientName={patientName}
        isDisabled={isPending}
      />
    </Modal>
  );
}
