import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../common/Input";
import Select from "../common/Select";
const bookApointmentSchema = Yup.object({
  patient_id: Yup.string().required("مطلوب"),
  date: Yup.date().required("مطلوب"),
  time: Yup.string().required("مطلوب"),
  doctor: Yup.string().required("مطلوب"),
});
export default function BookAppointmentForm() {
  const tempOptions = [{ value: "test", label: "test" }];
  return (
    <div className="bg-gray-500 p-4 m-5">
      <Formik
        initialValues={{
          patient_id: "",
          date: "",
          time: "",
          doctor: "",
        }}
        validationSchema={bookApointmentSchema}
        onSubmit={() => {}}
      >
        <Form>
          <div className="grid grid-cols-2 gap-8">
            <Input label="المريض" name="patient_id" />
            <Input label="التاريخ" name="date" type="date" />
            <Input label="الوقت" name="time" type="time" />
            <Select options={tempOptions} placeholder="اختر الطبيب" label="الطبيب" name="doctor" />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
