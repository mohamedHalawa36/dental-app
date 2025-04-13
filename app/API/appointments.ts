import { toast } from "sonner";
import type { Database } from "~/types/database.types";
import { somethingWentWrongMsg } from "./messages";
import supabase from "./supabase";

export const getAllAppointments = async (
  {
    search,
    date,
  }: {
    search: string;
    date: string | undefined;
  },
  signal: AbortSignal
) => {
  let query = supabase.from("Appointments").select("*, patient:Patients(*)");

  if (date) query = query.eq("date", date);
  if (search.trim().length > 0)
    query = query.ilike("Patients.name", `%${search}%`);

  if (signal) return await query.abortSignal(signal);

  return await query;
};

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
    else toast.error(somethingWentWrongMsg);
  }
};
export const deleteAppointment = async (id: string) => {
  const { data, status, error } = await supabase
    .from("Appointments")
    .delete()
    .eq("id", id)
    .select("*");

  if (!error) toast.success("تم إلغاء الموعد");
  else toast.error(somethingWentWrongMsg);
};
