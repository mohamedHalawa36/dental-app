import supabase from "./supabase";

export const getAllDoctors = () => {
  return supabase.from("Profiles").select("*").eq("role", "doctor");
};
