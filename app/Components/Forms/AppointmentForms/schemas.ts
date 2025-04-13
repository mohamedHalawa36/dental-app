import * as Yup from "yup";

export const bookApointmentSchema = Yup.object({
  patient_id: Yup.string().required("مطلوب"),
  date: Yup.date().required("مطلوب"),
  time: Yup.string().nullable(),
});

export const initialAppointmentValues = {
  patient_id: "",
  date: "",
  time: null,
};
