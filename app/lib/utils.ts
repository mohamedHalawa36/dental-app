import { clsx, type ClassValue } from "clsx";
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

export function formatTime(timeString: string) {
  const [hours, minutes] = timeString.split(":").map(Number);

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  const time = `${String(formattedHours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;
  return `${time} ${period}`;
}
