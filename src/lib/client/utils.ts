import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  const originalDate = new Date(date);
  const formatDate = originalDate.toLocaleDateString("es-ES");
  return formatDate;
}
