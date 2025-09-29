import type { PatientApiData } from "./apiData";

export enum PATIENT_CARD_TYPES {
  APPOINTMENT = "appointment",
  PATIENT = "patient",
}

interface BasePatientCardProps {
  patient: PatientApiData;
}

interface AppointmentPatientCardProps extends BasePatientCardProps {
  variant: PATIENT_CARD_TYPES.APPOINTMENT;
  time: string | null;
  date: string;
  appointmentId: string;
  doctor: {
    id: string;
    name: string;
  };
}

interface PatientTypeCardProps extends BasePatientCardProps {
  variant: PATIENT_CARD_TYPES.PATIENT;
}

export type PatientCardProps =
  | AppointmentPatientCardProps
  | PatientTypeCardProps;

export type PhoneOptionsProps = {
  phone: string | null;
  hasWhatsapp: boolean | null;
};
