import { toast } from "sonner";
import type { AddPatientApiData, UpdatePatientApiData } from "~/types/apiData";
import { messages } from "./messages";
import supabase from "./supabase";

const {
  add: addSuccessMsg,
  update: updateSuccessMsg,
  delete: deleteSuccessMsg,
} = messages.success.patient;

const { conflict: conflictMsg } = messages.error.patient;

export const getAllPatients = async (
  search: string = "",
  signal?: AbortSignal,
) => {
  let query = supabase.from("patients").select("*");
  if (search.trim().length > 0) query = query.ilike("name", `%${search}%`);

  if (signal) return await query.abortSignal(signal);

  return await query;
};

export const getPatient = async (id: string) => {
  return supabase.from("patients").select("*").eq("id", id);
};

export const addPatient = async (values: AddPatientApiData) => {
  const { error } = await supabase
    .from("patients")
    .insert([values])
    .select("*");

  if (!error) toast.success(addSuccessMsg);
};

export const updatePatient = async (patient: UpdatePatientApiData) => {
  const { error } = await supabase
    .from("patients")
    .update(patient)
    .eq("id", patient.id)
    .select("*");

  if (!error) toast.success(updateSuccessMsg);
};

export const deletePatient = async (id: string) => {
  const { error, status } = await supabase
    .from("patients")
    .delete()
    .eq("id", id)
    .select("*");

  if (!error) toast.success(deleteSuccessMsg);
  else {
    if (status === 409)
      toast.error(conflictMsg, {
        duration: Infinity,
      });
  }
};
