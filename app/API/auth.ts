import { toast } from "sonner";
import type { SignInUserData } from "~/types/apiData";
import { somethingWentWrongMsg } from "./messages";
import supabase, { ApiError } from "./supabase";

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", userId)
    .single();

  if (!error) {
    return data;
  } else {
    throw new ApiError(error.message, undefined, error.code);
  }
};

export const signInUser = async (userData: SignInUserData) => {
  const { data, error } = await supabase.auth.signInWithPassword(userData);

  if (!error) {
    const {
      user: { id },
    } = data;

    return await getUserProfile(id);
  } else {
    throw new ApiError(error.message, error.status, error.code);
  }
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) toast.error(somethingWentWrongMsg);
};
