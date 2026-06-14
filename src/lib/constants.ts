// Constants for the application

export const APP_NAME = "EBOLA EMERGENCY SUPPORT";
export const APP_DESCRIPTION = "Supporting Ebola victims and affected communities";

export const HEARD_ABOUT_OPTIONS = [
  { value: "Social Media", label: "Social Media" },
  { value: "Healthcare Worker/Organization", label: "Healthcare Worker/Organization" },
  { value: "Friend/Family Referral", label: "Friend/Family Referral" },
  { value: "Community Announcement", label: "Community Announcement" },
  { value: "News/Media", label: "News/Media" },
  { value: "Government Agency", label: "Government Agency" },
  { value: "Other", label: "Other" },
];

export const OCCUPATION_OPTIONS = [
  { value: "Healthcare Worker", label: "Healthcare Worker" },
  { value: "Teacher", label: "Teacher" },
  { value: "Farmer", label: "Farmer" },
  { value: "Business Owner", label: "Business Owner" },
  { value: "Student", label: "Student" },
  { value: "Unemployed", label: "Unemployed" },
  { value: "Retired", label: "Retired" },
  { value: "Other", label: "Other" },
];

export const APPLICATION_STATUS = {
  PENDING: "pending",
  UNDER_REVIEW: "under_review",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export const ESTIMATED_REVIEW_DAYS = "3-5 business days";

export const COLORS = {
  primary: "#1e40af", // Deep Blue
  secondary: "#059669", // Green
  accent: "#d97706", // Orange
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  background: "#f9fafb",
  text: "#111827",
};

export const CONTACT_INFO = {
  email: "support@ebola-emergency.org",
  phone: "+1 (800) EBOLA-HELP",
  hours: "24/7 Emergency Support Available",
};
