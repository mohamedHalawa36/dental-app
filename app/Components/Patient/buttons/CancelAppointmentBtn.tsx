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
      className=" md:w-2/5 lg:w-[25.5rem] w-11/12 h-fit overflow-hidden rounded-lg"
      isOpen={isOpen}
      toggle={(isOpen) => setIsOpen(isOpen ?? false)}
      trigger={
        <div className="border-secondary font-medium text-secondary hover:bg-secondary hover:text-white transition rounded-xl h-fit text-sm px-5 py-2 border">
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
