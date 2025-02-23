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
