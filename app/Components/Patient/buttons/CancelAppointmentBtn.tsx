import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment } from "~/API/appointments";

export default function CancelAppointmentBtn({
  appointmentId,
}: {
  appointmentId: string;
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation<unknown, unknown, string>({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });

  return (
    <button
      onClick={() => mutate(appointmentId)}
      className="border-secondary font-medium text-secondary hover:bg-secondary hover:text-white transition rounded-xl h-fit text-sm px-5 py-2 border"
    >
      إلغاء
    </button>
  );
}
