import { toast } from "sonner";
import type { Database } from "~/types/database.types";
import supabase from "./supabase";

export const getAllAppointments = async () =>
  await supabase.from("Appointments").select("*, patient:Patients(*)");

export const addAppointment = async (
  values: Database["public"]["Tables"]["Appointments"]["Insert"]
) => {
  const { data, status, error } = await supabase
    .from("Appointments")
    .insert([values])
    .select("*");
  console.log(error);

  if (!error) toast.success("تم حجز الموعد");
  else toast.error("حدث خطأ ما، برجاء المحاولة مجددا");
};
