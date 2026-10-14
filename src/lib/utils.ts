import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(totalSeconds: number) {
  if (totalSeconds >= 3600) {
    throw new Error("Shows cannot be longer than one hour.");
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function secondsToISO(totalSeconds: number) {
  if (totalSeconds >= 3600) {
    throw new Error("Shows cannot be longer than one hour.")
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `PT0H${minutes}M${seconds}S`
}

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export function formatPrice(amount: number) {
  return priceFormatter.format(amount);
}