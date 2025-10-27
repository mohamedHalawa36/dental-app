import useAuth from "~/hooks/useAuth";
import NoteCard from "./NoteCard";
import AddNoteForm from "../Forms/Notes/AddNoteForm";

type NotesListProps = {
  patientId: string;
};

export default function NotesList({ patientId }: NotesListProps) {
  const { authData } = useAuth();

  const data = {
    id: "1",
    doctor: authData?.user!,
    date: "11/12/2025",
    note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum tempore asperiores ea unde. Iste delectus hic fugit, non eveniet totam accusamus facere maxime cum repudiandae qui vitae, placeat rerum! Neque?",
  };

  return (
    <div className="flex flex-col items-start gap-4 overflow-auto px-5 py-4 md:overflow-auto">
      <AddNoteForm {...{ patientId }} />
      <NoteCard {...data} />
      <NoteCard {...data} />
      <NoteCard {...data} />
      <NoteCard {...data} />
      <NoteCard {...data} />
      <NoteCard {...data} />
      <NoteCard {...data} />
    </div>
  );
}
