import { toast } from "sonner";
import type { Database } from "~/types/database.types";
import supabase from "./supabase";

export const getAllAppointments = async () =>
  await supabase.from("Appointments").select("*, patient:Patients(*)");

export const getTodayAppointments = async () => {
  const today = new Date();
  const date = today.toLocaleDateString("en-CA");

  return await supabase
    .from("Appointments")
    .select("*, patient:Patients(*)")
    .eq("date", date);
};

export const addAppointment = async (
  values: Database["public"]["Tables"]["Appointments"]["Insert"]
) => {
  const { data, status, error } = await supabase
    .from("Appointments")
    .insert([values])
    .select("*");

  if (!error) toast.success("تم حجز الموعد");
  else {
    if (status === 409) toast.error("تم حجز موعد للمريض في نفس اليوم مسبقا");
    else toast.error("حدث خطأ ما، برجاء المحاولة مجددا");
  }
};
export const deleteAppointment = async (id: string) => {
  const { data, status, error } = await supabase
    .from("Appointments")
    .delete()
    .eq("id", id)
    .select("*");

  if (!error) toast.success("تم إلغاء الموعد");
  else toast.error("حدث خطأ ما، برجاء المحاولة مجددا");
};
