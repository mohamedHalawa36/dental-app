import { useState } from "react";
import ConfirmModal from "../common/Modals/ConfirmModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "~/API/notes";

type DeleteNoteModalProps = {
  noteId: string;
};

export default function DeleteNoteModal({ noteId }: DeleteNoteModalProps) {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ConfirmModal
      toggle={() => setIsOpen((prev) => !prev)}
      isOpen={isOpen}
      isActionsDisabled={isPending}
      title="حذف ملاحظة"
      trigger={
        <span className="text-secondary transition-all hover:opacity-70">
          حذف
        </span>
      }
      confirmCallBack={() => mutate(noteId)}
      cancelCallBack={() => setIsOpen(false)}
    >
      <p>هل أنت متأكد من حذف الملاحظة</p>
    </ConfirmModal>
  );
}
