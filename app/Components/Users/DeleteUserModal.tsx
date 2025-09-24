import { useState } from "react";
import ConfirmModal from "../common/Modals/ConfirmModal";
import Delete from "../icons/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "~/API/users";
import useAuth from "~/hooks/useAuth";

type DeleteUserModalProps = {
  userId: string;
  disabled?: boolean;
};

export default function DeleteUserModal({ userId }: DeleteUserModalProps) {
  const queryClient = useQueryClient();
  const { authData } = useAuth();
  const accessToken = authData?.session?.access_token;

  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteUser(userId, accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsOpen(false);
    },
  });

  return (
    <ConfirmModal
      toggle={() => setIsOpen((prev) => !prev)}
      isOpen={isOpen}
      isActionsDisabled={isPending}
      title="حذف مستخدم"
      trigger={<Delete className="size-6 fill-red-600" />}
      confirmCallBack={() => mutate()}
      cancelCallBack={() => setIsOpen(false)}
      confirmLabel="حذف"
    >
      <p>هل أنت متأكد؟</p>
      <p className="text-sm text-red-500">
        سيتم حذف كل السجلات المرتبطة بهذا المستخدم &nbsp;
      </p>
      <p className="font-medium text-primary">
        اذا كنت تريد الاحتفاظ بالسجلات يمكنك إلغاء تفعيل الحساب فقط
      </p>
    </ConfirmModal>
  );
}
