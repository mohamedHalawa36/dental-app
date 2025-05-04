import type { SignInUserData } from "~/types/apiData";
import supabase, { ApiError } from "./supabase";

export const signInUser = async (userData: SignInUserData) => {
  const { data, error } = await supabase.auth.signInWithPassword(userData);

  if (!error) {
    return data;
  } else {
    throw new ApiError(error.message, error.status, error.code);
  }
};
