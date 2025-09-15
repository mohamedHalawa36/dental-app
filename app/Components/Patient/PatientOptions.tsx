import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { deletePatient as deletePatientFunction } from "~/API/patient";
import useAttachBackBtn from "~/hooks/useAttachBackBtn";
import useAuth from "~/hooks/useAuth";
import type { PatientApiData } from "~/types/apiData";
import ConfirmModal from "../common/Modals/ConfirmModal";
import FormModal from "../common/Modals/FormModal";
import PatientForm from "../Forms/PatientForms/PatientForm";
import Delete from "../icons/Delete";
import Details from "../icons/Details";
import Pencil from "../icons/Pencil";
import ThreeDots from "../icons/ThreeDots";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function PatientOptions({
  patient,
}: {
  patient: PatientApiData;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { userId, isDoctor, isNurse, isAdmin } = useAuth();

  const triggerRef = useRef<HTMLButtonElement>(null);

  const patientId = patient.id;
  const patientName = patient.name;

  const queryClient = useQueryClient();
  const { mutate: deletePatient, isPending: isDeletingPatient } = useMutation<
    unknown,
    unknown,
    string
  >({
    mutationFn: deletePatientFunction,
    onSuccess: () => {
      setIsDeleting(false);
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
    },
  });

  useEffect(() => {
    const closeOptions = () => {
      triggerRef.current?.focus({
        preventScroll: true,
      });

      setIsOpen(false);
    };
    document.addEventListener("wheel", closeOptions);
    document.addEventListener("touchmove", closeOptions);
    return () => {
      document.removeEventListener("wheel", closeOptions);
      document.removeEventListener("touchmove", closeOptions);
    };
  }, []);

  useAttachBackBtn(() => {
    if (isOpen) setIsOpen?.(false);
  }, [isOpen]);

  const showMutationOptions =
    isAdmin || isNurse || (isDoctor && userId === patient.user_id);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative -m-1.5">
        <PopoverTrigger
          ref={triggerRef}
          className="flex size-8 items-center justify-center rounded-full transition-all hover:bg-gray-50"
        >
          <ThreeDots />
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="-mt-1 flex h-fit w-40 !animate-none flex-col overflow-hidden rounded-lg bg-white p-0 drop-shadow-md !duration-0"
        >
          <OptionBtn
            label="تفاصيل"
            icon={<Details className="size-[22.5px]" />}
          />

          {showMutationOptions && (
            <>
              <button onClick={() => setIsUpdating(true)}>
                <OptionBtn
                  label="تعديل"
                  icon={<Pencil className="-me-1 -ms-1 h-7 w-8" />}
                />
              </button>

              <ConfirmModal
                isOpen={isDeleting}
                toggle={() => setIsDeleting((open) => !open)}
                title="حذف مريض"
                trigger={
                  <OptionBtn
                    label="حذف"
                    icon={<Delete className="size-[22.5px] fill-red-600" />}
                  />
                }
                confirmCallBack={() => deletePatient(patientId)}
                cancelCallBack={() => setIsDeleting(false)}
                isActionsDisabled={isDeletingPatient}
              >
                <p className="text-lg font-semibold">
                  هل تريد حذف ملف &nbsp;
                  <span className="text-primary">{patientName}</span>
                  &nbsp; ؟
                </p>
              </ConfirmModal>
            </>
          )}
        </PopoverContent>
      </div>
      <FormModal
        title="تعديل مريض"
        isOpen={isUpdating}
        setIsOpen={setIsUpdating}
      >
        <PatientForm {...{ setIsOpen: setIsUpdating, patientId }} />
      </FormModal>
    </Popover>
  );
}

const OptionBtn = ({ label, icon }: { label: string; icon: ReactNode }) => {
  return (
    <span className="flex items-center gap-2 px-2.5 py-2 text-sm transition-all hover:bg-gray-50">
      {icon}
      {label}
    </span>
  );
};
