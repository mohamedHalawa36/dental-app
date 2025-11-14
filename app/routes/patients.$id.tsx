import { Link, useParams } from "react-router";
import ChevronLeft from "~/Components/icons/ChevronLeft";
import NotesList from "~/Components/Notes/NotesList";
import { PatientHeader } from "~/Components/Notes/PatientHeader";
import PageProvider from "~/Contexts/PageContext";
import useAuth from "~/hooks/useAuth";
import { cn } from "~/lib/utils";

export default function PatientDetailsPage() {
  const { id } = useParams();
  const { isDoctor } = useAuth();

  return (
    <div className="flex size-full max-h-full flex-1 flex-col gap-3 bg-gradient-to-b from-cyan-300/40 to-fuchsia-300/40 to-70% p-3 pb-2 md:p-5">
      <Link
        to="/patients"
        className="flex items-center self-end text-sm font-semibold text-slate-500 underline-offset-8 transition-all hover:text-primary hover:underline"
      >
        العودة للمرضى
        <ChevronLeft className="size-3 stroke-slate-500" />
      </Link>

      <main className="container mx-auto flex-1 overflow-auto">
        <PageProvider>
          <div
            className={cn(
              "flex size-full flex-1 flex-col divide-y-2 divide-slate-200 rounded-xl border border-primary/20 bg-white/50",
              {
                "mx-auto h-fit lg:w-1/2": !isDoctor,
              },
            )}
          >
            <PatientHeader patientId={id ?? ""} />
            {isDoctor && <NotesList patientId={id ?? ""} />}
          </div>
        </PageProvider>
      </main>
    </div>
  );
}
