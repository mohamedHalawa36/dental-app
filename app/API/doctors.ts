import supabase from "./supabase";

export const getAllDoctors = async () => {
  return supabase.from("profiles").select("*").eq("role", "doctor");
};
