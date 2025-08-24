import type { Database } from "./database.types";

export type PatientApiData = Database["public"]["Tables"]["patients"]["Row"];
export type AddPatientApiData =
  Database["public"]["Tables"]["patients"]["Insert"];

export type UpdatePatientApiData =
  Database["public"]["Tables"]["patients"]["Update"];

export type AppointmentApiData =
  Database["public"]["Tables"]["appointments"]["Row"] & {
    patient: PatientApiData;
  };

export type BookApointmentApiData =
  Database["public"]["Tables"]["appointments"]["Insert"];

export type UpdateApointmentApiData =
  Database["public"]["Tables"]["appointments"]["Update"] & {
    patient: PatientApiData;
  };

export type SignInUserData = {
  email: string;
  password: string;
};

export type UserProfile = Database["public"]["Tables"]["profiles"]["Row"];

export type AddAvailabilityData =
  Database["public"]["Tables"]["doctor_availability"]["Insert"];

export type updateAvailabilityData =
  Database["public"]["Tables"]["doctor_availability"]["Update"];
