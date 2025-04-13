import type { Dispatch, SetStateAction } from "react";
import type { PatientApiData } from "./apiData";

export type AddPatientFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  patient?: PatientApiData;
};
