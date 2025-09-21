import { toast } from "sonner";
import type { SignInUserData } from "~/types/apiData";
import { somethingWentWrongMsg, somethingWentWrongToastId } from "./messages";
import supabase, { ApiError } from "./supabase";

export const getUserProfile = async (userId: string) => {
  const res = await supabase
    .from("profiles")
    .select()
    .eq("id", userId)
    .single();

  return res;
};

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

export const getUserSession = async () => {
  const response = await supabase.auth.getSession();
  const { error } = response;
  if (!error) return response;

  return await supabase.auth.getSession();
};

export const resetPassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (!error) {
    return data;
  } else {
    if (error.code === "same_password") {
      toast.dismiss(somethingWentWrongToastId);
      toast.error("تم إدخال نفس كلمة السر القديمة، برجاء ادخال كلمة سر جديدة");
    }

    throw new ApiError(error.message, error.status, error.code);
  }
};

export const setResetedPassword = async (
  userId: string,
  hasResetedPassword: boolean,
) => {
  const res = await supabase
    .from("profiles")
    .update({ has_reseted_password: hasResetedPassword })
    .eq("id", userId)
    .select()
    .single();

  return res;
};
