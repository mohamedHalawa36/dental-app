import * as Yup from "yup";
import { requiredMsg } from "~/API/messages";

export const bookApointmentSchema = Yup.object({
  patient_id: Yup.string().required(requiredMsg),
  date: Yup.date().required(requiredMsg),
  time: Yup.string().nullable(),
});

export const initialAppointmentValues = {
  patient_id: "",
  date: "",
  time: null,
};
