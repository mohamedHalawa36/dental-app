import type {
  AddAvailabilityData,
  updateAvailabilityData,
} from "~/types/apiData";
import supabase from "./supabase";
import { messages } from "./messages";
import { toast } from "sonner";

const { update: updateSuccessMsg, delete: deleteSuccessMsg } =
  messages.success.appointment;

const { conflict: conflictMsg } = messages.error.appointment;

export const getDoctorAvailabilty = async (doctorId: string) => {
  return await supabase
    .from("doctor_availability")
    .select()
    .eq("doctor_id", doctorId)
    .order("day", { ascending: true });
};

export const addDoctorAvailabilty = async (
  availabilityData: AddAvailabilityData,
) => {
  const { error, status } = await supabase
    .from("doctor_availability")
    .insert([availabilityData])
    .select();

  if (!error) toast.success("تم إضافة الموعد بنجاح");
  else {
    if (status === 409) toast.error(conflictMsg);
  }
};

export const updateDoctorAvailabilty = async (
  availabilityData: updateAvailabilityData,
) => {
  const { error } = await supabase
    .from("doctor_availability")
    .update(availabilityData)
    .eq("id", availabilityData.id)
    .select();

  if (!error) toast.success(updateSuccessMsg);
};

export const deleteAvailabilty = async (id: number) => {
  const { error } = await supabase
    .from("doctor_availability")
    .delete()
    .eq("id", id)
    .select();

  if (!error) toast.success(deleteSuccessMsg);
};

export const getOneAvailability = async (
  doctorId: string,
  recordId: number,
) => {
  return await supabase
    .from("doctor_availability")
    .select()
    .eq("doctor_id", doctorId)
    .eq("id", recordId);
};
