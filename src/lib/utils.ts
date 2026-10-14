import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(totalSeconds: number) {
  if (totalSeconds < 0) {
    throw new RangeError("totalSeconds must be greater than 0");
  }
  if (totalSeconds >= 3600) {
    throw new RangeError("Shows cannot be longer than one hour.");
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function secondsToISO(totalSeconds: number) {
  if (totalSeconds < 0) {
    throw new RangeError("totalSeconds must be greater than 0");
  }
  if (totalSeconds >= 3600) {
    throw new RangeError("Shows cannot be longer than one hour.")
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
  if (amount < 0) {
    throw new RangeError("Amount must be greater than 0");
  }
  return priceFormatter.format(amount);
}