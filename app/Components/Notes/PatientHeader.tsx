import type { PatientApiData } from "~/types/apiData";
import PhoneOptions from "../Patient/PhoneOptions";

type PatientHeaderProps = {
  patient: PatientApiData;
};

export function PatientHeader({ patient }: PatientHeaderProps) {
  const { phone, phone_has_whatsapp, name, address, age } = patient;
  return (
    <div className="flex flex-col gap-2 rounded-xl p-5">
      <p className="text-xl font-bold text-slate-700">{name}</p>
      <span className="font-semibold">
        {age}
        &nbsp; سنة
      </span>
      <PhoneOptions phone={phone} hasWhatsapp={phone_has_whatsapp} />
      {address && <p className="text-gray-400">{address}</p>}
    </div>
  );
}
