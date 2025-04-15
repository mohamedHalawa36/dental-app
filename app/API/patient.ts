import { toast } from "sonner";
import { messages, somethingWentWrongMsg } from "./messages";
import supabase from "./supabase";
import type { AddPatientApiData, UpdatePatientApiData } from "~/types/apiData";

const {
  add: addSuccessMsg,
  update: updateSuccessMsg,
  delete: deleteSuccessMsg,
} = messages.success.patient;

const { conflict: conflictMsg } = messages.error.patient;

export const getAllPatients = async (
  search: string = "",
  signal?: AbortSignal
) => {
  let query = supabase.from("Patients").select("*");
  if (search.trim().length > 0) query = query.ilike("name", `%${search}%`);

  if (signal) return await query.abortSignal(signal);

  return await query;
};

export const getPatient = async (id: string) => {
  return supabase.from("Patients").select("*").eq("id", id);
};

export const addPatient = async (values: AddPatientApiData) => {
  const { error } = await supabase
    .from("Patients")
    .insert([values])
    .select("*");

  if (!error) toast.success(addSuccessMsg);
  else toast.error(somethingWentWrongMsg);
};

export const updatePatient = async (patient: UpdatePatientApiData) => {
  const { error } = await supabase
    .from("Patients")
    .update(patient)
    .eq("id", patient.id)
    .select("*");

  if (!error) toast.success(updateSuccessMsg);
  else toast.error(somethingWentWrongMsg);
};

export const deletePatient = async (id: string) => {
  const { error, status } = await supabase
    .from("Patients")
    .delete()
    .eq("id", id)
    .select("*");

  if (!error) toast.success(deleteSuccessMsg);
  else {
    if (status === 409)
      toast.error(conflictMsg, {
        duration: Infinity,
      });
    else toast.error(somethingWentWrongMsg);
  }
};
