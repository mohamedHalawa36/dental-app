import { toast } from "sonner";
import type { Database } from "~/types/database.types";
import { messages, somethingWentWrongMsg } from "./messages";
import supabase from "./supabase";
import type {
  BookApointmentApiData,
  UpdateApointmentApiData,
} from "~/types/apiData";

const {
  add: addSuccessMsg,
  update: updateSuccessMsg,
  delete: deleteSuccessMsg,
} = messages.success.appointment;

const { conflict: conflictMsg } = messages.error.appointment;

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

export const getAppointment = async (appointmentIid: string) => {
  return await supabase
    .from("Appointments")
    .select("*, patient:Patients(*)")
    .eq("id", appointmentIid);
};

export const getTodayAppointments = async () => {
  const today = new Date();
  const date = today.toLocaleDateString("en-CA");

  return await supabase
    .from("Appointments")
    .select("*, patient:Patients(*)")
    .eq("date", date);
};

export const addAppointment = async (values: BookApointmentApiData) => {
  const { status, error } = await supabase
    .from("Appointments")
    .insert([values])
    .select("*");

  if (!error) toast.success(addSuccessMsg);
  else {
    if (status === 409) toast.error(conflictMsg);
    else toast.error(somethingWentWrongMsg);
  }
};

export const updateAppointment = async (
  appointment: UpdateApointmentApiData
) => {
  const { patient, ...restAppointmentData } = appointment;
  const { error } = await supabase
    .from("Appointments")
    .update(restAppointmentData)
    .eq("id", appointment.id)
    .select("*");

  if (!error) toast.success(addSuccessMsg);
  else toast.error(somethingWentWrongMsg);
};

export const deleteAppointment = async (id: string) => {
  const { error } = await supabase
    .from("Appointments")
    .delete()
    .eq("id", id)
    .select("*");

  if (!error) toast.success(deleteSuccessMsg);
  else toast.error(somethingWentWrongMsg);
};
