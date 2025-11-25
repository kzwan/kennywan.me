import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// THis merges tailwind classes elegantly
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}