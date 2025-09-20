import { toast } from "sonner";
import supabase from "./supabase";
import { messages, somethingWentWrongMsg } from "./messages";
import type { CreateUserData } from "~/types/apiData";

const {
  success: {
    user: { delete: deleteMsg, add: createMsg },
  },
} = messages;
export const getAllUsers = async () => {
  const response = await supabase.from("profiles").select("*");
  return response;
};

export const deleteUser = async (targetUserId: string, accessToken: string) => {
  const resp = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-auth-user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // user's JWT
      },
      body: JSON.stringify({ user_id: targetUserId }),
    },
  );

  const payload = await resp.json();
  if (!resp.ok) {
    toast.error(somethingWentWrongMsg);
    throw new Error(payload?.error || "Failed to delete user");
  }

  toast.success(deleteMsg);
  return payload;
};

export const createUser = async (
  userData: CreateUserData,
  accessToken: string,
) => {
  const resp = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-auth-user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(userData),
    },
  );

  const payload = await resp.json();
  if (!resp.ok) {
    toast.error(somethingWentWrongMsg);
    throw new Error(payload?.error || "Failed to create user");
  }

  toast.success(createMsg);
  return payload;
};
