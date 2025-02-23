// import { Form, Formik } from "formik";
// import * as Yup from "yup";
// import Input from "../common/Input";
// import Select from "../common/Select";
// const bookApointmentSchema = Yup.object({
//   patient_id: Yup.string().required("مطلوب"),
//   date: Yup.date().required("مطلوب"),
//   time: Yup.string().required("مطلوب"),
// });
// export default function BookAppointmentForm() {
//   const tempOptions = [{ value: "test", label: "test" }];
//   return (
//     <div className="bg-gray-500 p-4 m-5">
//       <Formik
//         initialValues={{
//           patient_id: "",
//           date: "",
//           time: "",
//           doctor: "",
//         }}
//         validationSchema={bookApointmentSchema}
//         onSubmit={() => {}}
//       >
//         <Form>
//           <div className="grid grid-cols-2 gap-8">
//             <Input label="المريض" name="patient_id" />
//             <Input label="التاريخ" name="date" type="date" />
//             <Input label="الوقت" name="time" type="time" />
//             <Select options={tempOptions} placeholder="اختر الطبيب" label="الطبيب" name="doctor" />
//           </div>
//         </Form>
//       </Formik>
//     </div>
//   );
// }

import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { addPatient } from "~/API/patient";
import SubmitBtn from "../common/SubmitBtn";
import InputField from "./Fields/InputField";
import SelectField from "./Fields/SelectField";

const bookApointmentSchema = Yup.object({
  patient_id: Yup.string().required("مطلوب"),
  date: Yup.date().required("مطلوب"),
  time: Yup.string(),
});

export default function AddPatientForm() {
  const { mutate, isPending } = useMutation({
    mutationFn: addPatient,
  });

  return (
    <div className="h-full overflow-auto px-2">
      <Formik
        initialValues={{
          patient_id: "",
          date: "",
          time: "",
        }}
        validationSchema={bookApointmentSchema}
        onSubmit={(values) => mutate(values)}
      >
        <Form>
          <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1 max-md:gap-8 overflow-auto ">
            <SelectField label="المريض" name="patient_id" />
            <InputField label="التاريخ" name="date" type="date" />
            <InputField label="الوقت" name="time" type="time" />
          </div>
          <SubmitBtn disabled={isPending} />
        </Form>
      </Formik>
    </div>
  );
}
