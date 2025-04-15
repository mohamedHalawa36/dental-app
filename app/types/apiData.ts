import type { Database } from "./database.types";

export type PatientApiData = Database["public"]["Tables"]["Patients"]["Row"];
export type AddPatientApiData =
  Database["public"]["Tables"]["Patients"]["Insert"];

export type UpdatePatientApiData =
  Database["public"]["Tables"]["Patients"]["Update"];

export type AppointmentApiData =
  Database["public"]["Tables"]["Appointments"]["Row"] & {
    patient: PatientApiData;
  };

export type BookApointmentApiData =
  Database["public"]["Tables"]["Appointments"]["Insert"];

export type UpdateApointmentApiData =
  Database["public"]["Tables"]["Appointments"]["Update"] & {
    patient: PatientApiData;
  };
