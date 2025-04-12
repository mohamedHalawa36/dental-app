import { useEffect, useRef, useState, type ReactNode } from "react";
import Delete from "../icons/Delete";
import Details from "../icons/Details";
import Pencil from "../icons/Pencil";
import ThreeDots from "../icons/ThreeDots";

export default function PatientOptions() {
  const [isOpen, setisOpen] = useState(false);

  const optionsRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const closeOptions = (e: MouseEvent) => {
      if (e.target !== optionsRef.current) setisOpen(false);
    };

    document.addEventListener("click", closeOptions);

    return () => document.removeEventListener("click", closeOptions);
  }, [optionsRef.current]);

  return (
    <div className="relative -m-1.5">
      <button
        ref={optionsRef}
        onClick={() => setisOpen((open) => !open)}
        className=" rounded-full hover:bg-gray-50 transition-all  size-8 flex justify-center items-center"
      >
        <ThreeDots />
      </button>
      {isOpen && (
        <div className=" absolute bottom-0 translate-y-full left-3 flex flex-col z-50 bg-white drop-shadow-lg w-40 rounded-lg overflow-hidden">
          <OptionBtn label="تعديل" icon={<Pencil className="-ms-1 size-7" />} />
          <OptionBtn
            label="حذف"
            icon={<Delete className=" fill-red-600 size-[22.5px]" />}
          />
          <OptionBtn
            label="تفاصيل"
            icon={<Details className="size-[22.5px]" />}
          />
        </div>
      )}
    </div>
  );
}

const OptionBtn = ({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-2 flex items-center gap-2 hover:bg-gray-50 transition-all text-sm"
    >
      {icon}
      {label}
    </button>
  );
};
