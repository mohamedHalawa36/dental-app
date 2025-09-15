import { toast } from "sonner";
import supabase from "./supabase";
import { messages } from "./messages";

const {
  success: {
    user: { delete: deleteMsg },
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
    throw new Error(payload?.error || "Failed to delete user");
  }

  toast.success(deleteMsg);
  return payload;
};
