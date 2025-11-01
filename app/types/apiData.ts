import type { PostgrestSingleResponse } from "@supabase/supabase-js";
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

export type AvailabilityData =
  Database["public"]["Tables"]["doctor_availability"]["Row"];

export type AddAvailabilityData =
  Database["public"]["Tables"]["doctor_availability"]["Insert"];

export type updateAvailabilityData =
  Database["public"]["Tables"]["doctor_availability"]["Update"];

export type UserData = Database["public"]["Tables"]["profiles"]["Row"];

export type CreateUserData =
  Database["public"]["Tables"]["profiles"]["Insert"] & {
    password: string;
  };

export type UserRole = Database["public"]["Enums"]["user_role"];

export type SelectPatientsResponse = PostgrestSingleResponse<
  {
    address: string;
    age: number;
    created_at: string;
    id: string;
    name: string;
    phone: string;
    phone_has_whatsapp: boolean;
    user_id: string;
  }[]
>;

export type NoteData = Database["public"]["Tables"]["notes"]["Row"];
export type InsertNote = Database["public"]["Tables"]["notes"]["Insert"];

export type NoteApiData = Database["public"]["Tables"]["notes"]["Row"] & {
  doctor: { id: string; name: string };
};
