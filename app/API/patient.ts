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
  page: number,
  pageSize: number,
  signal?: AbortSignal,
) => {
  const to = page * pageSize;
  const from = to - pageSize;

  let query = supabase
    .from("patients")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search.trim().length > 0) query = query.ilike("name", `%${search}%`);

  if (signal) return await query.abortSignal(signal);

  const res = await query;
  return res;
};

export const getPatient = async (id: string) => {
  return supabase.from("patients").select("*").eq("id", id);
};

export const addPatient = async (values: AddPatientApiData) => {
  const response = await supabase.from("patients").insert([values]).select("*");
  const { error } = response;

  if (!error) toast.success(addSuccessMsg);
  else throw new Error(error.message, { cause: response });
};

export const updatePatient = async (patient: UpdatePatientApiData) => {
  const response = await supabase
    .from("patients")
    .update(patient)
    .eq("id", patient.id)
    .select("*");

  const { error } = response;

  if (!error) toast.success(updateSuccessMsg);
  else throw new Error(error.message, { cause: response });
};

export const deletePatient = async (id: string) => {
  const response = await supabase
    .from("patients")
    .delete()
    .eq("id", id)
    .select("*");

  const { error, status } = response;

  if (!error) toast.success(deleteSuccessMsg);
  else {
    if (status === 409) toast.error(conflictMsg);
    throw new Error(error.message, { cause: response });
  }
};
