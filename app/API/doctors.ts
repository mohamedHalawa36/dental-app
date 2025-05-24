import supabase from "./supabase";

export const getAllDoctors = () => {
  return supabase.from("profiles").select("*").eq("role", "doctor");
};
