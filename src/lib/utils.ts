import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format status for display
 */
export function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    pending: "Pending Review",
    under_review: "Under Review",
    approved: "Approved",
    rejected: "Rejected",
  };
  return statusMap[status] || status;
}

/**
 * Get status color class
 */
export function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    under_review: "bg-blue-100 text-blue-800 border-blue-300",
    approved: "bg-green-100 text-green-800 border-green-300",
    rejected: "bg-red-100 text-red-800 border-red-300",
  };
  return colorMap[status] || "bg-gray-100 text-gray-800 border-gray-300";
}
