import supabase from "./supabase";

export const getAllPatients = async () =>
  await supabase.from("Patients").select("*");
