import * as Yup from "yup";
import { requiredMsg } from "~/API/messages";

export const addNoteSchema = Yup.object({
  doctor_id: Yup.string().required(requiredMsg),
  patient_id: Yup.string().required(requiredMsg),
  date: Yup.date().required(requiredMsg),
  note: Yup.string().required(requiredMsg),
});
