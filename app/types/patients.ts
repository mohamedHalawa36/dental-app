import type { Dispatch, SetStateAction } from "react";

export type AddPatientFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  patientId?: string;
};
