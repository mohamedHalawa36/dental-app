import type {
  AddAvailabilityData,
  updateAvailabilityData,
} from "~/types/apiData";
import supabase from "./supabase";
import { messages } from "./messages";
import { toast } from "sonner";

const {
  add: addSuccessMsg,
  update: updateSuccessMsg,
  delete: deleteSuccessMsg,
} = messages.success.availability;

const { conflict: conflictMsg } = messages.error.availability;

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
  const response = await supabase
    .from("doctor_availability")
    .insert([availabilityData])
    .select();

  const { error, status } = response;

  if (!error) toast.success(addSuccessMsg);
  else {
    if (status === 409) toast.error(conflictMsg);
    throw new Error(error.message, { cause: response });
  }
};

export const updateDoctorAvailabilty = async (
  availabilityData: updateAvailabilityData,
) => {
  const response = await supabase
    .from("doctor_availability")
    .update(availabilityData)
    .eq("id", availabilityData.id)
    .select();

  const { error } = response;

  if (!error) toast.success(updateSuccessMsg);
  else throw new Error(error.message, { cause: response });
};

export const deleteAvailabilty = async (id: number) => {
  const response = await supabase
    .from("doctor_availability")
    .delete()
    .eq("id", id)
    .select();

  const { error } = response;

  if (!error) toast.success(deleteSuccessMsg);
  else throw new Error(error.message, { cause: response });
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
