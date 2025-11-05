import PhoneOptions from "../Patient/PhoneOptions";
import { useQuery } from "@tanstack/react-query";
import { getPatient } from "~/API/patient";
import RenderData from "../common/RenderData";

type PatientHeaderProps = {
  patientId: string;
};

export function PatientHeader({ patientId }: PatientHeaderProps) {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => getPatient(patientId!),
  });

  const patient = data?.data;
  const isEmpty = !patient;

  return (
    <RenderData {...{ isFetching, isError, isEmpty }}>
      <div className="max-sm flex flex-col gap-1 rounded-xl px-5 py-3 max-sm:px-3">
        <p className="text-lg font-bold text-slate-700 max-sm:text-base">
          {patient?.name}
        </p>
        <span className="font-semibold max-sm:text-sm">
          {patient?.age}
          &nbsp; سنة
        </span>
        <PhoneOptions
          phone={patient?.phone ?? null}
          hasWhatsapp={patient?.phone_has_whatsapp ?? null}
        />
        {patient?.address && (
          <p className="text-gray-400">{patient?.address}</p>
        )}
      </div>
    </RenderData>
  );
}
