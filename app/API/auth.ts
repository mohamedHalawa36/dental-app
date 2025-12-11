import { toast } from "sonner";
import type { ChangePasswordUserData, SignInUserData } from "~/types/apiData";
import { somethingWentWrongMsg, somethingWentWrongToastId } from "./messages";
import supabase, { ApiError } from "./supabase";
import { throwInvalidCredentialsError } from "~/utils/auth";

export const getUserProfile = async (userId: string) => {
  const res = await supabase
    .from("profiles")
    .select()
    .eq("id", userId)
    .single();

  return res;
};

export const getUserByEmail = async (email: string) => {
  const res = await supabase
    .from("profiles")
    .select()
    .eq("email", email)
    .single();

  return res;
};

export const signInUser = async (userData: SignInUserData) => {
  const {
    data: userProfile,
    error: profileError,
    status: profileStatus,
  } = await getUserByEmail(userData.email);

  if (profileError)
    throw new ApiError(profileError.message, profileStatus, profileError.code);

  if (!userProfile || !userProfile.is_active) throwInvalidCredentialsError();

  const { data, error } = await supabase.auth.signInWithPassword(userData);

  if (!error) {
    return { ...data, userProfile };
  } else {
    throw new ApiError(error.message, error.status, error.code);
  }
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  localStorage.clear();
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

export const changeUserPassword = async ({
  email,
  current_password,
  password,
}: ChangePasswordUserData) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: current_password,
  });

  if (error) {
    toast.dismiss(somethingWentWrongToastId);
    throw new ApiError(error.message, error.status, error.code);
  }

  const res = resetPassword(password);
  return res;
};
