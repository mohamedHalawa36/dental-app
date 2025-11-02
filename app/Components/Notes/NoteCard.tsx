import type { NoteApiData } from "~/types/apiData";
import Doctor from "../icons/Doctor";
import { Form, Formik } from "formik";
import PageLoader from "../common/Loaders/PageLoader";
import { DateTimePicker } from "../common/DatePicker";
import Button from "../common/Button";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addNoteSchema } from "../Forms/Notes/schema";
import { cn } from "~/lib/utils";
import useAuth from "~/hooks/useAuth";
import { updateNote } from "~/API/notes";
import { formatDate } from "~/utils/time";
import DeleteNoteModal from "./DeleteNoteModal";

export default function NoteCard({
  id,
  date,
  note,
  doctor,
  patient_id,
}: NoteApiData) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { userId } = useAuth();
  const isTheSameDoctor = userId === doctor.id;

  const { mutate, isPending } = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      setIsUpdating(false);
    },
  });

  const doctorName = doctor.name;
  const dateString = formatDate(new Date(date));

  const noteRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isUpdating) return;

    const textarea = noteRef.current;
    if (textarea) {
      textarea.focus();
      const length = textarea.value.length;
      textarea.setSelectionRange(length, length);
    }
  }, [isUpdating]);

  return (
    <Formik
      initialValues={{
        id,
        doctor_id: doctor.id,
        patient_id: patient_id,
        date: dateString,
        note: note,
      }}
      validationSchema={addNoteSchema}
      onSubmit={(values) => mutate(values)}
    >
      {({ values, setFieldValue, resetForm, dirty, isValid }) => {
        const { date, note, id } = values;
        const selectedDate = new Date(date);

        return (
          <Form className="relative flex w-full flex-col gap-3">
            {isPending && (
              <PageLoader className="absolute inset-0 m-0 size-full bg-slate-100/50" />
            )}

            <div className="flex w-full flex-col gap-4 rounded-xl border border-gray-300 border-primary/40 p-3">
              <div className="flex items-center justify-between text-gray-500">
                <div className="flex items-center gap-1">
                  <Doctor className="size-5" />
                  <span className="text-sm">د/ {doctorName}</span>
                </div>
                <DateTimePicker
                  value={selectedDate}
                  onChange={(date) => setFieldValue("date", date)}
                  className="w-fit text-sm text-primary [&>svg]:!size-5 [&>svg]:stroke-primary"
                  granularity="day"
                  disabled={!isUpdating}
                />
              </div>
              <textarea
                rows={isUpdating ? 5 : undefined}
                ref={noteRef}
                placeholder="اكتب ملاحظاتك هنا"
                className={cn(
                  "rounded-xl bg-transparent p-2 text-foreground transition-all placeholder:text-sm focus:outline-primary",
                  {
                    "resize-none": !isUpdating,
                    "border border-gray-300": isUpdating,
                  },
                )}
                name="note"
                onChange={(e) => setFieldValue("note", e.target.value)}
                value={note}
                disabled={!isUpdating}
              />
              {isTheSameDoctor
                ? !isUpdating && (
                    <div className="-mt-1 flex items-center justify-end gap-2 text-sm font-semibold">
                      <button
                        className="text-primary transition-all hover:opacity-70"
                        onClick={() => setIsUpdating(true)}
                      >
                        تعديل
                      </button>
                      <DeleteNoteModal noteId={id} />
                    </div>
                  )
                : null}
            </div>
            {isUpdating && (
              <div className="ms-1 flex w-fit items-center gap-3">
                <Button
                  className="w-20 p-2 text-sm"
                  disabled={!isValid || !dirty}
                >
                  حفظ
                </Button>
                <Button
                  variant="secondary"
                  className="w-20 border-secondary p-2 text-sm text-secondary hover:bg-secondary hover:text-white"
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsUpdating(false);
                  }}
                >
                  إلغاء
                </Button>
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}
