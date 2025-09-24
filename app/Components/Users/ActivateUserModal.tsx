import { useState } from "react";
import ConfirmModal from "../common/Modals/ConfirmModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setIsUserActive } from "~/API/users";
import { Switch } from "../ui/switch";

type ActivateUserModalProps = {
  active: boolean;
  userId: string;
  disabled?: boolean;
};

export default function ActivateUserModal({
  userId,
  active,
  disabled,
}: ActivateUserModalProps) {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(active);

  const { mutate, isPending } = useMutation({
    mutationFn: () => setIsUserActive(isActive, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsOpen(false);
    },
  });

  const activateLabel = isActive ? "تفعيل المستخدم" : "إلغاء تفعيل المستخدم";

  return (
    <>
      <Switch
        disabled={disabled}
        checked={isActive}
        onCheckedChange={(checked) => {
          setIsActive(checked);
          setIsOpen(true);
        }}
      />
      <ConfirmModal
        toggle={() => setIsOpen((prev) => !prev)}
        isOpen={isOpen}
        isActionsDisabled={isPending}
        title={isActive ? "تفعيل مستخدم" : "إلغاء تفعيل مستخدم"}
        confirmCallBack={() => mutate()}
        cancelCallBack={() => {
          setIsOpen(false);
          setIsActive((prev) => !prev);
        }}
      >
        <p>هل أنت متأكد من {activateLabel} ؟</p>
      </ConfirmModal>
    </>
  );
}
