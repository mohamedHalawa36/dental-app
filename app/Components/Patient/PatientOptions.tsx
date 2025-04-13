import { useEffect, useRef, useState, type ReactNode } from "react";
import FormModal from "../common/Modals/FormModal";
import PatientForm from "../Forms/PatientForms/PatientForm";
import Delete from "../icons/Delete";
import Details from "../icons/Details";
import Pencil from "../icons/Pencil";
import ThreeDots from "../icons/ThreeDots";

export default function PatientOptions({ patientId }: { patientId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const optionsRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const closeOptions = (e: MouseEvent) => {
      e.stopPropagation();
      const target = e.target;
      const trigger = optionsRef.current;
      if (target === trigger || trigger?.contains(target as HTMLElement))
        return;
      setIsOpen(false);
    };

    document.removeEventListener("click", closeOptions);
    document.addEventListener("click", closeOptions);

    return () => document.removeEventListener("click", closeOptions);
  }, [optionsRef.current]);

  return (
    <>
      <div className="relative -m-1.5">
        <button
          ref={optionsRef}
          onClick={() => setIsOpen((open) => !open)}
          className=" rounded-full hover:bg-gray-50 transition-all  size-8 flex justify-center items-center"
        >
          <ThreeDots />
        </button>
        {isOpen && (
          <div className=" absolute bottom-0 translate-y-full left-3 flex flex-col z-50 bg-white drop-shadow-lg w-40 rounded-lg overflow-hidden">
            <OptionBtn
              label="تفاصيل"
              icon={<Details className="size-[22.5px]" />}
            />
            <button onClick={() => setIsUpdating(true)}>
              <OptionBtn
                label="تعديل"
                icon={<Pencil className="-ms-1 h-7 w-8 -me-1" />}
              />
            </button>

            <OptionBtn
              label="حذف"
              icon={<Delete className=" fill-red-600 size-[22.5px]" />}
            />
          </div>
        )}
      </div>
      <FormModal
        title="تعديل مريض"
        isOpen={isUpdating}
        setIsOpen={setIsUpdating}
      >
        <PatientForm {...{ setIsOpen: setIsUpdating, patientId }} />
      </FormModal>
    </>
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
