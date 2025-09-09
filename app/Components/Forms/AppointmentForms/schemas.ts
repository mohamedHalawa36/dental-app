import * as Yup from "yup";
import { requiredMsg } from "~/API/messages";
import { getArabicDayName, isBeforeToday } from "~/lib/utils";

export const bookApointmentSchema = Yup.object({
  patient_id: Yup.string().required(requiredMsg),
  doctor_id: Yup.string()
    .required(requiredMsg)
    .when("availableDays", ([availableDays], schema: Yup.StringSchema) => {
      return schema.test({
        name: "doctor-availability",
        message: "لاتوجد مواعيد متاحة للطبيب المختار",
        test: (doctorId) => {
          if (!availableDays) return true;

          return !!doctorId && availableDays?.length > 0;
        },
      });
    }),
  date: Yup.string()
    .required(requiredMsg)
    .when(
      "availableDays",
      ([availableDays]: (number[] | undefined)[], schema: Yup.StringSchema) => {
        return schema.test({
          name: "date-availability",
          message: `مواعيد الطبيب أيام ${availableDays
            ?.sort()
            ?.map((day: number) => getArabicDayName(day.toString()))
            ?.join(" ، ")} فقط`,
          test: (date) => {
            if (!availableDays?.length) return true;
            const newDate = new Date(date!);
            const day = newDate.getDay();
            return availableDays?.includes(day);
          },
        });
      },
    )
    .test({
      name: "not-before-today",
      test: (value) => {
        const date = new Date(value);
        return !isBeforeToday(date);
      },
      message: "لا يمكن حجز موعد بتاريخ قديم",
    }),
  time: Yup.string().nullable(),
  availableDays: Yup.array(),
});

export type BookAppointmentFormValues = Omit<
  Yup.InferType<typeof bookApointmentSchema>,
  "availableDays"
>;

export const initialAppointmentValues = {
  patient_id: "",
  date: "",
  doctor_id: "",
  time: null,
  availableDays: [],
};
