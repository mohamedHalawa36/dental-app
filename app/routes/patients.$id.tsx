import { Link, useParams } from "react-router";
import ChevronLeft from "~/Components/icons/ChevronLeft";
import PageProvider from "~/Contexts/PageContext";

export default function PatientDetailsPage() {
  const { id } = useParams();

  return (
    <div className="flex size-full max-h-full flex-1 flex-col rounded-3xl bg-gradient-to-b from-cyan-200/30 to-fuchsia-200/30 to-70% p-5 shadow-xl">
      <Link
        to="/patients"
        className="flex items-center self-end text-sm font-semibold text-slate-500 underline-offset-8 transition-all hover:text-primary hover:underline"
      >
        العودة للمرضى
        <ChevronLeft className="size-3 stroke-slate-500" />
      </Link>

      <main className="flex-1">
        <PageProvider>
          <div className="flex h-full w-full flex-col sm:gap-3 sm:px-5 sm:pb-3 sm:pt-4">
            <div className="flex-1 overflow-auto py-1">
              <div className="flex-1 overflow-auto py-1">Patient {id}</div>
            </div>
          </div>
        </PageProvider>
      </main>
    </div>
  );
}
