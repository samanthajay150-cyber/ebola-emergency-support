// Validation schemas using Zod
import { z } from 'zod';

export const step1Schema = z.object({
  readyToProceed: z.boolean({
    required_error: "Please select an option",
  }),
});

export const step2Schema = z.object({
  firstTimeApplicant: z.boolean({
    required_error: "Please select an option",
  }),
});

export const step3Schema = z.object({
  heardAboutFunds: z.string({
    required_error: "Please select an option",
  }).min(1, "Please select an option"),
  otherSource: z.string().optional(),
}).refine(
  (data) => {
    if (data.heardAboutFunds === "Other" && !data.otherSource?.trim()) {
      return false;
    }
    return true;
  },
  {
    message: "Please specify the source",
    path: ["otherSource"],
  }
);

export const step4Schema = z.object({
  occupation: z.string({
    required_error: "Please select your occupation",
  }).min(1, "Please select your occupation"),
  otherOccupation: z.string().optional(),
}).refine(
  (data) => {
    if (data.occupation === "Other" && !data.otherOccupation?.trim()) {
      return false;
    }
    return true;
  },
  {
    message: "Please specify your occupation",
    path: ["otherOccupation"],
  }
);

export const step5Schema = z.object({
  acknowledged: z.literal(true, {
    errorMap: () => ({ message: "You must acknowledge to proceed" }),
  }),
});

export const step6Schema = z.object({
  fullName: z.string({
    required_error: "Full name is required",
  }).min(2, "Name must be at least 2 characters"),
  age: z.number({
    required_error: "Age is required",
    invalid_type_error: "Age must be a number",
  }).min(1, "Age must be at least 1").max(150, "Age must be 150 or less"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phoneNumber: z.string().optional(),
});

export const step7Schema = z.object({
  country: z.string({
    required_error: "Please select your country",
  }).min(1, "Please select your country"),
});

export const step8Schema = z.object({
  stateTown: z.string({
    required_error: "Please enter your state/town",
  }).min(2, "Location must be at least 2 characters"),
  addressDetails: z.string().optional(),
});

export const fullApplicationSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema)
  .merge(step7Schema)
  .merge(step8Schema);

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
export type Step5Data = z.infer<typeof step5Schema>;
export type Step6Data = z.infer<typeof step6Schema>;
export type Step7Data = z.infer<typeof step7Schema>;
export type Step8Data = z.infer<typeof step8Schema>;
export type FullApplicationData = z.infer<typeof fullApplicationSchema>;
