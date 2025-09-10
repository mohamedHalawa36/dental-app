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

export const deleteUser = async (id: string) => {
  const response = await supabase
    .from("profiles")
    .delete()
    .eq("id", id)
    .select();

  const { error } = response;

  if (!error) toast.success(deleteMsg);
  else throw new Error(error.message, { cause: response });
};
