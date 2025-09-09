import supabase from "./supabase";

export const getAllUsers = async () => {
  const response = await supabase.from("profiles").select("*");
  return response;
};
