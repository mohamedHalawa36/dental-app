import useAuth from "~/hooks/useAuth";
import NoteCard from "./NoteCard";
import AddNoteForm from "../Forms/Notes/AddNoteForm";
import { useQuery } from "@tanstack/react-query";
import { getPatientNotes } from "~/API/notes";
import RenderData from "../common/RenderData";

type NotesListProps = {
  patientId: string;
};

export default function NotesList({ patientId }: NotesListProps) {
  const { isDoctor } = useAuth();

  const { isError, isFetching, data } = useQuery({
    queryKey: ["notes", patientId],
    queryFn: () => getPatientNotes(patientId),
  });

  const notes = data?.data;

  return (
    <RenderData {...{ isFetching, isError, isEmpty: false }}>
      <div className="flex flex-col items-start gap-4 overflow-auto px-5 py-4 md:overflow-auto">
        {isDoctor && <AddNoteForm {...{ patientId }} />}
        {notes?.map((note) => (
          <NoteCard {...note} />
        ))}
      </div>
    </RenderData>
  );
}
