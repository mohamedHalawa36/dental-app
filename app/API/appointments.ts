import { toast } from "sonner";
import type {
  BookApointmentApiData,
  UpdateApointmentApiData,
} from "~/types/apiData";
import { messages } from "./messages";
import supabase from "./supabase";

const {
  add: addSuccessMsg,
  update: updateSuccessMsg,
  delete: deleteSuccessMsg,
} = messages.success.appointment;

const { dayConflict: dayConflictMsg, timeConflict: timeConflictMsg } =
  messages.error.appointment;

export const getAllAppointments = async (
  {
    search,
    date,
  }: {
    search: string;
    date: string | undefined;
  },
  signal: AbortSignal,
) => {
  let query = supabase.from("appointments").select("*, patient:patients(*)");

  if (date) query = query.eq("date", date);
  if (search.trim().length > 0)
    query = query.ilike("patients.name", `%${search}%`);

  if (signal) return await query.abortSignal(signal);

  return await query;
};

export const getDoctorAppointments = async (
  {
    search,
    date,
    doctorId,
  }: {
    search: string;
    date: string | undefined;
    doctorId: string;
  },
  signal: AbortSignal,
) => {
  let query = supabase
    .from("appointments")
    .select("*, patient:patients(*)")
    .eq("doctor_id", doctorId);

  if (date) query = query.eq("date", date);
  if (search.trim().length > 0)
    query = query.ilike("patients.name", `%${search}%`);

  if (signal) return await query.abortSignal(signal);

  return await query;
};

export const getAppointment = async (appointmentIid: string) => {
  return await supabase
    .from("appointments")
    .select("*, patient:patients(*)")
    .eq("id", appointmentIid);
};

export const getTodayAppointments = async () => {
  const today = new Date();
  const date = today.toLocaleDateString("en-CA");

  return await supabase
    .from("appointments")
    .select("*, patient:patients(*)")
    .eq("date", date);
};

export const addAppointment = async (values: BookApointmentApiData) => {
  const response = await supabase
    .from("appointments")
    .insert([values])
    .select("*");

  const { status, error } = response;

  if (!error) toast.success(addSuccessMsg);
  else {
    if (status === 409) {
      const isTimeConflict = error.message.includes("unique_day_time");
      if (isTimeConflict) toast.error(timeConflictMsg);
      else toast.error(dayConflictMsg);
    }
    throw new Error(error.message, { cause: response });
  }
};

export const updateAppointment = async (
  appointment: UpdateApointmentApiData,
) => {
  const { patient, ...restAppointmentData } = appointment;
  const response = await supabase
    .from("appointments")
    .update(restAppointmentData)
    .eq("id", appointment.id)
    .select("*");

  const { error } = response;

  if (!error) toast.success(updateSuccessMsg);
  else throw new Error(error.message, { cause: response });
};

export const deleteAppointment = async (id: string) => {
  const response = await supabase
    .from("appointments")
    .delete()
    .eq("id", id)
    .select("*");

  const { error } = response;

  if (!error) toast.success(deleteSuccessMsg);
  else throw new Error(error.message, { cause: response });
};
