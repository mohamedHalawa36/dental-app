import supabase from "./supabase";

export const getDoctorAvailabilty = async (doctorId: string) => {
  return await supabase
    .from("doctor_availability")
    .select()
    .eq("doctor_id", doctorId);
};
