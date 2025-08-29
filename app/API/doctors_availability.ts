import type {
  AddAvailabilityData,
  updateAvailabilityData,
} from "~/types/apiData";
import supabase from "./supabase";
import { messages } from "./messages";

const {
  add: addSuccessMsg,
  update: updateSuccessMsg,
  delete: deleteSuccessMsg,
} = messages.success.appointment;

export const getDoctorAvailabilty = async (doctorId: string) => {
  return await supabase
    .from("doctor_availability")
    .select()
    .eq("doctor_id", doctorId);
};

export const addDoctorAvailabilty = async (
  availabilityData: AddAvailabilityData,
) => {
  return await supabase
    .from("doctor_availability")
    .insert([availabilityData])
    .select();
};

export const updateDoctorAvailabilty = async (
  availabilityData: updateAvailabilityData,
) => {
  return await supabase
    .from("doctor_availability")
    .update(availabilityData)
    .eq("id", availabilityData.id)
    .select();
};

export const deleteAvailabilty = async (id: number) => {
  return await supabase
    .from("doctor_availability")
    .delete()
    .eq("id", id)
    .select();
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
