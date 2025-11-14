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
      <div className="flex justify-between gap-1 px-5 py-4 max-sm:px-3">
        <div className="max-sm flex flex-col gap-1 rounded-xl">
          <p className="text-lg font-bold text-slate-700 max-sm:text-base">
            {patient?.name}
          </p>
          <span className="font-semibold max-sm:text-sm">
            {patient?.age}
            &nbsp; سنة
          </span>

          {patient?.address && (
            <p className="text-gray-400">{patient?.address}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 p-1">
          <PhoneOptions
            phone={patient?.phone1 ?? null}
            hasWhatsapp={patient?.phone1_has_whatsapp ?? null}
            className="max-sm:text-xs"
          />
          <PhoneOptions
            phone={patient?.phone2 ?? null}
            hasWhatsapp={patient?.phone2_has_whatsapp ?? null}
            className="max-sm:text-xs"
          />
          <PhoneOptions
            phone={patient?.phone3 ?? null}
            hasWhatsapp={patient?.phone3_has_whatsapp ?? null}
            className="max-sm:text-xs"
          />
        </div>
      </div>
    </RenderData>
  );
}
