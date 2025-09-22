import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import MainFormLayout from "~/Layouts/MainFormLayout";
import CheckboxField from "../Fields/CheckboxField";
import InputField from "../Fields/InputField";
import { createUsertSchema, initialUserValue, roleOptions } from "./schemas";
import { Label } from "~/Components/ui/label";
import { createUser } from "~/API/users";
import type { CreateUserData } from "~/types/apiData";
import useAuth from "~/hooks/useAuth";
import type { Dispatch, SetStateAction } from "react";
import SelectField from "../Fields/SelectField";

type UserFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function UserForm({ setIsOpen }: UserFormProps) {
  const queryClient = useQueryClient();
  const accessToken = useAuth().authData?.session?.access_token;

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateUserData) => createUser(values, accessToken!),
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <Formik
      initialValues={initialUserValue}
      validationSchema={createUsertSchema}
      onSubmit={(values) => mutate(values)}
      validateOnChange={true}
    >
      <MainFormLayout
        className="gap-4"
        submitBtnLabel={"إضافة"}
        isSubmitting={isPending}
      >
        <InputField label="الاسم" name="name" />
        <SelectField
          label="الوظيفة"
          name="role"
          options={roleOptions}
          placeholder="اختر الوظيفة"
        />
        <InputField label="البريد الإلكتروني" name="email" />
        <InputField
          name="password"
          label="كلمة السر"
          type="password"
          autoComplete="off"
        />
        <Label htmlFor="is_admin" className="mb-4 flex items-center gap-1.5">
          <span>مسؤول {`(Admin)`}</span>
          <CheckboxField className="max-sm:size-4" name="is_admin" />
        </Label>
      </MainFormLayout>
    </Formik>
  );
}
