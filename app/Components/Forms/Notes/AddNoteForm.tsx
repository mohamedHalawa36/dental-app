import { useState } from "react";
import PlusCircle from "../../icons/PlusCircle";
import { Form, Formik } from "formik";
import Doctor from "../../icons/Doctor";
import useAuth from "~/hooks/useAuth";
import { DateTimePicker } from "../../common/DatePicker";
import Button from "../../common/Button";
import { addNoteSchema } from "./schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PageLoader from "~/Components/common/Loaders/PageLoader";
import { addNote } from "~/API/notes";
import { formatDate } from "~/utils/time";

type AddNoteFormProps = {
  patientId: string;
};

export default function AddNoteForm({ patientId }: AddNoteFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { userName, userId } = useAuth();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (!isAdding)
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80"
      >
        <PlusCircle className="size-5" />
        أضف ملاحظة
      </button>
    );

  return (
    <Formik
      initialValues={{
        doctor_id: userId!,
        patient_id: patientId,
        date: formatDate(new Date()),
        note: "",
      }}
      validationSchema={addNoteSchema}
      onSubmit={(values) => mutate(values)}
    >
      {({ values, setFieldValue, isValid, dirty }) => {
        const { date } = values;
        const selectedDate = new Date(date);
        const today = new Date();

        return (
          <Form className="relative flex w-full flex-col gap-3">
            {isPending && (
              <PageLoader className="absolute inset-0 m-0 size-full bg-slate-100/50" />
            )}

            <div className="flex w-3/4 flex-col gap-4 rounded-xl border border-gray-300 border-primary/40 bg-white p-3 max-lg:w-full">
              <div className="flex items-center justify-between text-gray-500">
                <div className="flex items-center gap-1">
                  <Doctor className="size-5" />
                  <span className="text-sm">د/ {userName}</span>
                </div>
                <DateTimePicker
                  value={selectedDate}
                  onChange={(date) =>
                    setFieldValue("date", formatDate(date ?? today))
                  }
                  className="w-fit text-sm text-primary [&>svg]:!size-5 [&>svg]:stroke-primary"
                  granularity="day"
                />
              </div>
              <textarea
                placeholder="اكتب ملاحظاتك هنا"
                className="rounded-xl border border-gray-300 bg-transparent p-2 text-foreground transition-all placeholder:text-sm focus:outline-primary"
                name="note"
                onChange={(e) => setFieldValue("note", e.target.value)}
                rows={isAdding ? 3.5 : undefined}
              />
            </div>
            <div className="ms-1 flex w-fit items-center gap-3">
              <Button
                className="w-20 p-2 text-sm max-sm:w-16"
                type="submit"
                disabled={!isValid || !dirty}
              >
                حفظ
              </Button>
              <Button
                variant="secondary"
                type="button"
                className="w-20 border-secondary p-2 text-sm text-secondary hover:bg-secondary hover:text-white max-sm:w-16"
                onClick={() => setIsAdding(false)}
              >
                إلغاء
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
