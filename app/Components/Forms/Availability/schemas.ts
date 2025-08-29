import * as Yup from "yup";
import { requiredMsg } from "~/API/messages";
import type { AvailabilityData } from "~/types/apiData";

export const addAvailabilitySchema = (currAvailabilities: AvailabilityData[]) =>
  Yup.object({
    day: Yup.string()
      .required(requiredMsg)
      .test({
        test: (day) => !currAvailabilities.some((av) => av.day === day),
        message: "يوجد موعد في هذا اليوم بالفعل",
      }),
    start_time: Yup.string().required(requiredMsg),
    end_time: Yup.string().required(requiredMsg),
    doctor_id: Yup.string().required(requiredMsg),
  });

export const AddAvailabilityInitialValue = {
  doctor_id: "",
  start_time: "",
  end_time: "",
  day: "",
};

export const daysOptions = [
  {
    value: "6",
    label: "السبت",
  },
  {
    value: "0",
    label: "الأحد",
  },
  {
    value: "1",
    label: "الإثنين",
  },
  {
    value: "2",
    label: "الثلاثاء",
  },
  {
    value: "3",
    label: "الأربعاء",
  },
  {
    value: "4",
    label: "الخميس",
  },
  {
    value: "5",
    label: "الجمعة",
  },
];
