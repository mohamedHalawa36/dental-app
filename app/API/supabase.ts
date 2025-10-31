import { AuthError, createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import type { Database } from "~/types/database.types";
import { messages, somethingWentWrongToastId } from "./messages";
import { logoutUser } from "./auth";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY ?? "";

const {
  auth: { unAuth },
  somethingWentWrong,
} = messages.error;

const interceptor = async (
  url: string | URL | globalThis.Request,
  options: RequestInit | undefined,
) => {
  const response = await fetch(url, options);
  const { status } = response;
  const isGetRequest = options?.method === "GET";

  if (!response.ok && !isGetRequest) {
    if (status === 403) {
      toast.error(unAuth);
      throw new Error("Not Authorized");
    } else if (status === 401) {
      await logoutUser();
      window.location.href = "/login";
      throw new Error("Not Authintecated");
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
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
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
