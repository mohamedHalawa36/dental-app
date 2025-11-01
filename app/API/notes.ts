import type { InsertNote } from "~/types/apiData";
import supabase from "./supabase";
import { toast } from "sonner";

export const getPatientNotes = async (patientId: string) =>
  supabase
    .from("notes")
    .select(
      `
      *,
      doctor:profiles(id,name)
    `,
    )
    .order("date", { ascending: false })
    .eq("patient_id", patientId);

export const addNote = async (note: InsertNote) => {
  const response = await supabase.from("notes").insert([note]).select("*");
  const { error } = response;

  if (!error) toast.success("تم إضافة الملاحظة");
  else throw new Error(error.message, { cause: response });
};
