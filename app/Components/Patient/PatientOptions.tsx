import { useRef, useState, type ReactNode } from "react";
import FormModal from "../common/Modals/FormModal";
import PatientForm from "../Forms/PatientForms/PatientForm";
import Delete from "../icons/Delete";
import Details from "../icons/Details";
import Pencil from "../icons/Pencil";
import ThreeDots from "../icons/ThreeDots";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function PatientOptions({ patientId }: { patientId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const optionsRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Popover>
      <div className="relative -m-1.5">
        <PopoverTrigger
          ref={optionsRef}
          className=" rounded-full hover:bg-gray-50 transition-all size-8 flex justify-center items-center"
        >
          <button>
            <ThreeDots />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="flex flex-col h-fit bg-white drop-shadow-md w-40 rounded-lg overflow-hidden p-0 -mt-1"
        >
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
