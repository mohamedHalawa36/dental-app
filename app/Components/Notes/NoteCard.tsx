import type { NoteApiData } from "~/types/apiData";
import Doctor from "../icons/Doctor";
import { Form, Formik } from "formik";
import PageLoader from "../common/Loaders/PageLoader";
import { DateTimePicker } from "../common/DatePicker";
import Button from "../common/Button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addNoteSchema } from "../Forms/Notes/schema";
import { cn } from "~/lib/utils";
import useAuth from "~/hooks/useAuth";

export default function NoteCard({
  date,
  note,
  doctor,
  patient_id,
}: NoteApiData) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { userId } = useAuth();
  const isTheSameDoctor = userId === doctor.id;

  const { mutate, isPending } = useMutation({
    mutationFn: () => {},
  });

  const doctorName = doctor.name;

  return (
    <Formik
      initialValues={{
        doctor_id: doctor.id,
        patient_id: patient_id,
        date: new Date(date),
        note: note,
      }}
      validationSchema={addNoteSchema}
      onSubmit={() => mutate()}
    >
      {({ values, setFieldValue }) => {
        const { date } = values;

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
                  value={date}
                  onChange={(date) => setFieldValue("date", date)}
                  className="w-fit text-sm text-primary [&>svg]:!size-5 [&>svg]:stroke-primary"
                  granularity="day"
                  disabled={!isUpdating}
                />
              </div>
              <textarea
                placeholder="اكتب ملاحظاتك هنا"
                className={cn(
                  "rounded-xl bg-transparent p-2 text-foreground transition-all placeholder:text-sm focus:outline-primary",
                  {
                    "resize-none": !isUpdating,
                    "border border-gray-300": isUpdating,
                  },
                )}
                name="note"
                onChange={(e) => setFieldValue("name", e.target.value)}
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
                      <button className="text-secondary transition-all hover:opacity-70">
                        حذف
                      </button>
                    </div>
                  )
                : null}
            </div>
            {isUpdating && (
              <div className="ms-1 flex w-fit items-center gap-3">
                <Button className="w-20 p-2 text-sm">حفظ</Button>
                <Button
                  variant="secondary"
                  className="w-20 border-secondary p-2 text-sm text-secondary hover:bg-secondary hover:text-white"
                  onClick={() => setIsUpdating(false)}
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
