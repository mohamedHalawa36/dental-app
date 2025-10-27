import type { UserProfile } from "~/types/apiData";
import Doctor from "../icons/Doctor";
import Calendar from "../icons/Calendar";

type NoteCardProps = {
  id: string;
  date: string;
  note: string;
  doctor: UserProfile;
};

export default function NoteCard({ date, note, doctor }: NoteCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-300 border-primary/40 p-3">
      <div className="flex items-center justify-between text-gray-500">
        <div className="flex items-center gap-1">
          <Doctor className="size-5" />
          <span className="text-sm">د/ {doctor.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="size-5 stroke-primary" />
          <span className="text-sm text-primary">{date}</span>
        </div>
      </div>
      <p className="text-left text-foreground">{note}</p>
    </div>
  );
}
