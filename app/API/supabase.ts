import { AuthError, createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import type { Database } from "~/types/database.types";
import { messages, somethingWentWrongToastId } from "./messages";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY ?? "";

const interceptor = async (
  url: string | URL | globalThis.Request,
  options: RequestInit | undefined,
) => {
  const response = await fetch(url, options);
  const { status } = response;

  const {
    auth: { unAuth },
    somethingWentWrong,
  } = messages.error;

  if (!response.ok) {
    if (status === 403) {
      toast.error(unAuth);
      throw new Error("Not Authorized");
    } else {
      toast.error(somethingWentWrong, {
        id: somethingWentWrongToastId,
      });
    }
  }

  return response;
};

const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  global: { fetch: interceptor },
});

export default supabase;

export class ApiError {
  message: AuthError["message"];
  statusCode: AuthError["status"];
  code: AuthError["code"];

  constructor(
    message: AuthError["message"],
    statusCode: AuthError["status"],
    code: AuthError["code"],
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
  }
}
