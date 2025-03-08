import type { Database } from "./database.types";

export type PatientApiData = Database["public"]["Tables"]["Patients"]["Row"];
export type AppointmentApiData =
  Database["public"]["Tables"]["Appointments"]["Row"] & {
    patient: PatientApiData;
  };
