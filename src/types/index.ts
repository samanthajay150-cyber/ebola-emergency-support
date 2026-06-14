// Types for Ebola Emergency Support Application

export interface Application {
  id?: number;
  application_id: string;
  
  // Onboarding Questions
  ready_to_proceed: boolean;
  first_time_applicant: boolean;
  heard_about_funds: string;
  other_source?: string;
  occupation: string;
  other_occupation?: string;
  
  // Personal Information
  full_name: string;
  age: number;
  email?: string;
  phone_number?: string;
  
  // Location Information
  country: string;
  country_name?: string;
  state_town: string;
  address_details?: string;
  
  // Application Status
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  submission_date?: string;
  updated_date?: string;
  
  // Notes
  notes?: string;
}

export interface Country {
  name: common;
  cca2: string;
  flag: string;
}

export interface FormData {
  readyToProceed: boolean;
  firstTimeApplicant: boolean;
  heardAboutFunds: string;
  otherSource?: string;
  occupation: string;
  otherOccupation?: string;
  acknowledged: boolean;
  fullName: string;
  age: number;
  email?: string;
  phoneNumber?: string;
  country: string;
  stateTown: string;
  addressDetails?: string;
}

export interface StepInfo {
  id: number;
  title: string;
  subtitle?: string;
}
