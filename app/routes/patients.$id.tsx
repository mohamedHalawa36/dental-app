import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { getPatient } from "~/API/patient";
import RenderData from "~/Components/common/RenderData";
import ChevronLeft from "~/Components/icons/ChevronLeft";
import NotesList from "~/Components/Notes/NotesList";
import { PatientHeader } from "~/Components/Notes/PatientHeader";
import PageProvider from "~/Contexts/PageContext";

export default function PatientDetailsPage() {
  const { id } = useParams();

  const { data, isFetching, isError } = useQuery({
    queryKey: ["patient", id],
    queryFn: () => getPatient(id!),
  });

  const patient = data?.data;

  return (
    <div className="flex size-full max-h-full flex-1 flex-col gap-3 bg-gradient-to-b from-cyan-300/40 to-fuchsia-300/40 to-70% p-5 pb-2">
      <Link
        to="/patients"
        className="flex items-center self-end text-sm font-semibold text-slate-500 underline-offset-8 transition-all hover:text-primary hover:underline"
      >
        العودة للمرضى
        <ChevronLeft className="size-3 stroke-slate-500" />
      </Link>

      <RenderData {...{ isError, isFetching, isEmpty: patient === null }}>
        <main className="container mx-auto flex-1 overflow-auto">
          <PageProvider>
            <div className="flex size-full flex-1 flex-col divide-y-2 divide-slate-200 rounded-xl border border-primary/20 bg-white/50">
              <PatientHeader patient={patient!} />
              <NotesList patientId={id ?? ""} />
            </div>
          </PageProvider>
        </main>
      </RenderData>
    </div>
  );
}
