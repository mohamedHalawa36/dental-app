import { toast } from "sonner";
import type { Database } from "~/types/database.types";
import supabase from "./supabase";

export const getAllPatients = async () =>
  await supabase.from("Patients").select("*");

export const addPatient = async (
  values: Database["public"]["Tables"]["Patients"]["Insert"]
) => {
  const { data, status, error } = await supabase
    .from("Patients")
    .insert([values])
    .select("*");

  if (!error) toast.success("تم إضافة المريض بنجاح");
  else toast.error("حدث خطأ ما، برجاء المحاولة مجددا");
};
