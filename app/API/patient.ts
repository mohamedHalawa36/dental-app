import { toast } from "sonner";
import type { Database } from "~/types/database.types";
import supabase from "./supabase";

export const getAllPatients = async (
  search: string = "",
  signal?: AbortSignal
) => {
  let query = supabase.from("Patients").select("*");
  if (search.trim().length > 0) query = query.ilike("name", `%${search}%`);

  if (signal) return await query.abortSignal(signal);

  return await query;
};

export const addPatient = async (
  values: Database["public"]["Tables"]["Patients"]["Insert"]
) => {
  const { error } = await supabase
    .from("Patients")
    .insert([values])
    .select("*");

  if (!error) toast.success("تم إضافة المريض بنجاح");
  else toast.error("حدث خطأ ما، برجاء المحاولة مجددا");
};
