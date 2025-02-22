import { Field, Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import WhatsApp from "../icons/WhatsApp";
import { Checkbox } from "../ui/checkbox";
import InputField from "./Fields/InputField";

const addPatientSchema = Yup.object({
  name: Yup.string().required("مطلوب"),
  age: Yup.string().required("مطلوب"),
  address: Yup.string(),
  phone1: Yup.string().required("مطلوب"),
  phone1_has_whatsapp: Yup.boolean().required("مطلوب"),
  phone2: Yup.string().required("مطلوب"),
  phone2_has_whatsapp: Yup.boolean().required("مطلوب"),
});

export default function AddPatientForm() {
  return (
    <div className="bg-gray-500 p-4 m-5">
      <Formik
        initialValues={{
          name: "",
          age: "",
          phone1: "",
          phone1_has_whatsapp: "",
          phone2: "",
          phone2_has_whatsapp: "",
        }}
        validationSchema={addPatientSchema}
        onSubmit={(val) => console.log(val)}
      >
        <Form>
          <div className="grid grid-cols-2 gap-8">
            <InputField label="الاسم" name="name" />
            <InputField label="العمر" name="age" />
            <PatientPhone
              label="رقم الهاتف"
              name="phone1"
              onChange={() => {}}
            />
            <PatientPhone
              label="رقم الهاتف"
              name="phone2"
              onChange={() => {}}
            />
          </div>
          <button type="submit">submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export function PatientPhone({
  label,
  name,
  onChange,
}: {
  label: string;
  name: string;
  onChange: () => void;
}) {
  const { values } = useFormikContext();
  console.log(values);

  return (
    <div className="flex gap-2">
      <InputField label={label} name={name} className="flex-1 w-full" />
      <div className="flex gap-1.5 items-center mt-6">
        <WhatsApp />
        <Field as={Checkbox} name={`${name}_has_whatsapp`} />
      </div>
    </div>
  );
}
