import { toast } from "sonner";
import type { SignInUserData } from "~/types/apiData";
import { somethingWentWrongMsg } from "./messages";
import supabase, { ApiError } from "./supabase";

export const signInUser = async (userData: SignInUserData) => {
  const { data, error } = await supabase.auth.signInWithPassword(userData);

  if (!error) {
    return data;
  } else {
    throw new ApiError(error.message, error.status, error.code);
  }
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) toast.error(somethingWentWrongMsg);
};
