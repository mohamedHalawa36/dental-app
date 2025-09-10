import { useState } from "react";
import ConfirmModal from "../common/Modals/ConfirmModal";
import Delete from "../icons/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "~/API/users";

type DeleteUserModalProps = {
  userId: string;
  disabled?: boolean;
};

export default function DeleteUserModal({ userId }: DeleteUserModalProps) {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor_availability"] });
    },
  });

  return (
    <ConfirmModal
      toggle={() => setIsOpen((prev) => !prev)}
      isOpen={isOpen}
      isActionsDisabled={isPending}
      title="حذف مستخدم"
      trigger={<Delete className="size-6 fill-red-600" />}
      confirmCallBack={() => mutate(userId)}
      cancelCallBack={() => setIsOpen(false)}
    >
      <p>هل أنت متأكد من حذف هذا المستخدم</p>
    </ConfirmModal>
  );
}
