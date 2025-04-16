import { useEffect, useRef, useState, type ReactNode } from "react";
import FormModal from "../common/Modals/FormModal";
import PatientForm from "../Forms/PatientForms/PatientForm";
import Delete from "../icons/Delete";
import Details from "../icons/Details";
import Pencil from "../icons/Pencil";
import ThreeDots from "../icons/ThreeDots";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ConfirmModal from "../common/Modals/ConfirmModal";
import type { PatientApiData } from "~/types/apiData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePatient as deletePatientFunction } from "~/API/patient";

export default function PatientOptions({
  patient,
}: {
  patient: PatientApiData;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      setIsOpen(false);
    };
    document.addEventListener("wheel", closeOptions);
    document.addEventListener("touchstart", closeOptions);
    return () => {
      document.removeEventListener("wheel", closeOptions);
      document.removeEventListener("touchstart", closeOptions);
    };
  }, [triggerRef.current]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative -m-1.5">
        <PopoverTrigger className=" rounded-full hover:bg-gray-50 transition-all size-8 flex justify-center items-center">
          <ThreeDots />
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="flex flex-col h-fit bg-white drop-shadow-md w-40 rounded-lg overflow-hidden p-0 -mt-1"
        >
          <OptionBtn
            label="تفاصيل"
            icon={<Details className="size-[22.5px]" />}
          />
          <button ref={triggerRef} onClick={() => setIsUpdating(true)}>
            <OptionBtn
              label="تعديل"
              icon={<Pencil className="-ms-1 h-7 w-8 -me-1" />}
            />
          </button>

          <ConfirmModal
            isOpen={isDeleting}
            toggle={() => setIsDeleting((open) => !open)}
            title="حذف مريض"
            trigger={
              <OptionBtn
                label="حذف"
                icon={<Delete className=" fill-red-600 size-[22.5px]" />}
              />
            }
            confirmCallBack={() => deletePatient(patientId)}
            cancelCallBack={() => setIsDeleting(false)}
            isActionsDisabled={isDeletingPatient}
          >
            <p className="font-semibold text-lg">
              هل تريد حذف ملف &nbsp;
              <span className=" text-primary">{patientName}</span>
              &nbsp; ؟
            </p>
          </ConfirmModal>
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
    <span className="px-2.5 py-2 flex items-center gap-2 hover:bg-gray-50 transition-all text-sm">
      {icon}
      {label}
    </span>
  );
};
