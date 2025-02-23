import { useMutation } from "@tanstack/react-query";
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { addPatient } from "~/API/patient";
import { numberOnly } from "~/lib/utils";
import SubmitBtn from "../common/SubmitBtn";
import WhatsApp from "../icons/WhatsApp";
import CheckboxField from "./Fields/CheckboxField";
import InputField from "./Fields/InputField";

const addPatientSchema = Yup.object({
  name: Yup.string().required("مطلوب"),
  age: Yup.number()
    .required("مطلوب")
    .min(4, "العمر غير صحيح")
    .max(100, "العمر غير صحيح"),
  address: Yup.string().required("مطلوب"),
  phone1: Yup.string().required("مطلوب"),
  phone1_has_whatsapp: Yup.boolean().required("مطلوب"),
  phone2: Yup.string().required("مطلوب"),
  phone2_has_whatsapp: Yup.boolean().required("مطلوب"),
});

export default function AddPatientForm() {
  const { mutate, isPending } = useMutation({
    mutationFn: addPatient,
  });

  return (
    <div className="h-full overflow-auto px-2">
      <Formik
        initialValues={{
          name: "",
          age: "",
          address: "",
          phone1: "",
          phone1_has_whatsapp: false,
          phone2: "",
          phone2_has_whatsapp: false,
        }}
        validationSchema={addPatientSchema}
        onSubmit={(values) => mutate(values)}
      >
        <Form>
          <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1 max-md:gap-8 overflow-auto ">
            <InputField label="الاسم" name="name" />
            <InputField onKeyDown={numberOnly} label="العمر" name="age" />
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
            <InputField label="العنوان" name="address" />
          </div>
          <SubmitBtn />
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
  const { errors } = useFormikContext();

  return (
    <div className="flex gap-2">
      <InputField
        onKeyDown={numberOnly}
        label={label}
        name={name}
        className="flex-1 w-full"
      />
      <div className="flex gap-1.5 items-center mt-2">
        <WhatsApp className="max-sm:size-5" />
        {/* <Field as={Checkbox} name={`phone1_has_whatsapp`} /> */}
        <CheckboxField className="size-4" name={`${name}_has_whatsapp`} />
      </div>
    </div>
  );
}
