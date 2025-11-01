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
      <div className="flex flex-col gap-2 rounded-xl p-5">
        <p className="text-xl font-bold text-slate-700">{patient?.name}</p>
        <span className="font-semibold">
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
