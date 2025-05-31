import { clsx, type ClassValue } from "clsx";
import { isBefore, startOfToday } from "date-fns";
import type { KeyboardEvent } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const numberOnly = (e: KeyboardEvent<HTMLInputElement>) => {
  const { key, code, ctrlKey } = e;

  if (key.length > 1 || ctrlKey) return;
  if (isNaN(Number(key)) || code === "Space") e.preventDefault();
};

export function formatTime(timeString: string | null) {
  if (!timeString) return timeString;
  const [hours, minutes] = timeString.split(":").map(Number);

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  const time = `${String(formattedHours).padStart(2, "0")}:${String(
    minutes,
  ).padStart(2, "0")}`;
  return `${time} ${period}`;
}

export const isBeforeToday = (date: Date) => {
  const today = startOfToday();
  return isBefore(date, today);
};

export const formatUserName = (name: string) => {
  const splittedName = name.split(" ");
  if (splittedName.length <= 2) return name;
  const firstName = splittedName[0];
  const lastName = splittedName[splittedName.length - 1];
  return `${firstName} ${lastName}`;
};

export const todaysDate = () => {
  const today = new Date();
  const formatted = today.toISOString().split("T")[0];
  return formatted;
};

export const formatApiDate = (date: Date | undefined) => {
  if (!date) return "";
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
};
