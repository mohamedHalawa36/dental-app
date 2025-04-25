import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/types/database.types";
import { handleConnectionStatus } from "~/utils/connectivity";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY ?? "";

const interceptor = async (
  url: string | URL | globalThis.Request,
  options: RequestInit | undefined
) => {
  handleConnectionStatus();

  const response = await fetch(url, options);

  return response;
};

const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  // global: { fetch: interceptor },
});

export default supabase;
