import type {
  AddAvailabilityData,
  updateAvailabilityData,
} from "~/types/apiData";
import supabase from "./supabase";

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
