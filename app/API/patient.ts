import type { Database } from "~/types/database.types";
import supabase from "./supabase";

export const getAllPatients = async () =>
  await supabase.from("Patients").select("*");

export const addPatient = async (
  values: Database["public"]["Tables"]["Patients"]["Insert"]
) => {
  await supabase.from("Patients").insert([values]).select("*");
};
