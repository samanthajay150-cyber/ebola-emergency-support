import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert } from "@/components/ui/alert";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { CountrySelect } from "@/components/CountrySelect";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormStep } from "@/components/FormStep";
import {
  HelpCircle,
  UserCheck,
  Users,
  Briefcase,
  Shield,
  FileCheck,
  CheckCircle,
  Download,
  Edit,
  X,
} from "lucide-react";
import { HEARD_ABOUT_OPTIONS, OCCUPATION_OPTIONS } from "@/lib/constants";
import type { Application } from "@/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FormData {
  readyToProceed: boolean | null;
  firstTimeApplicant: boolean | null;
  heardAboutFunds: string;
  otherSource: string;
  occupation: string;
  otherOccupation: string;
  fullName: string;
  age: string;
  email: string;
  phoneNumber: string;
  country: string;
  stateTown: string;
}

const initialFormData: FormData = {
  readyToProceed: null,
  firstTimeApplicant: null,
  heardAboutFunds: "",
  otherSource: "",
  occupation: "",
  otherOccupation: "",
  fullName: "",
  age: "",
  email: "",
  phoneNumber: "",
  country: "",
  stateTown: "",
};

const OnboardingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.readyToProceed !== null;
      case 2:
        return formData.firstTimeApplicant !== null;
      case 3:
        return (
          formData.heardAboutFunds !== "" &&
          (formData.heardAboutFunds !== "Other" ||
            formData.otherSource.trim() !== "")
        );
      case 4:
        return (
          formData.occupation !== "" &&
          (formData.occupation !== "Other" ||
            formData.otherOccupation.trim() !== "")
        );
      case 5:
        return true; // Acknowledge step - always valid after clicking continue
      case 6:
        return (
          formData.fullName.trim() !== "" &&
          formData.age !== "" &&
          parseInt(formData.age) > 0 &&
          parseInt(formData.age) <= 150
        );
      case 7:
        return formData.country !== "";
      case 8:
        return formData.stateTown.trim().length >= 2;
      case 9:
        return true; // Review step - already validated all fields
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (currentStep === 1 && formData.readyToProceed === false) {
      handleNotReady();
      return;
    }

    if (currentStep < 10) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNotReady = () => {
    toast.info("You can return to apply anytime!");
    setCurrentStep(1);
    setFormData(initialFormData);
  };

  const handleSubmit = async () => {
    if (!validateStep(9)) {
      toast.error("Please complete all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const applicationData: Partial<Application> = {
        ready_to_proceed: formData.readyToProceed!,
        first_time_applicant: formData.firstTimeApplicant!,
        heard_about_funds: formData.heardAboutFunds,
        occupation: formData.occupation,
        full_name: formData.fullName,
        age: parseInt(formData.age),
        email: formData.email || undefined,
        phone_number: formData.phoneNumber || undefined,
        country: formData.country,
        state_town: formData.stateTown,
      };

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit application");
      }

      const result = await response.json();
      setApplicationId(result.applicationId);
      setCurrentStep(10);
      toast.success("Application submitted successfully!");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setShowCancelModal(false);
    toast.info("Application cancelled");
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
  };

  // Render steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormStep
            stepNumber={1}
            title="Welcome!"
            subtitle="Thank you for contacting EBOLA EMERGENCY TEAM!"
            icon={<HelpCircle className="h-6 w-6" />}
            onNext={handleNext}
            showPrevious={false}
            nextLabel={formData.readyToProceed ? "Continue" : "Exit"}
            nextDisabled={formData.readyToProceed === null}
          >
            <div className="space-y-6">
              <p className="text-gray-700 text-base">
                We're here to help you through this difficult time. Please answer a few
                questions to begin your application for emergency financial assistance.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-900 font-medium mb-3">
                  Are you ready to proceed with the application?
                </p>
                <RadioGroup
                  name="readyToProceed"
                  value={formData.readyToProceed?.toString()}
                  onValueChange={(val) => updateFormData({ readyToProceed: val === "true" })}
                >
                  <RadioGroupItem
                    value="true"
                    id="ready-yes"
                    label="Yes, I'm ready"
                  />
                  <RadioGroupItem
                    value="false"
                    id="ready-no"
                    label="No, not now"
                  />
                </RadioGroup>
              </div>

              {formData.readyToProceed === false && (
                <Alert
                  variant="info"
                  title="No problem!"
                  description="You can come back anytime when you're ready. If you have questions, please contact our support team."
                />
              )}
            </div>
          </FormStep>
        );

      case 2:
        return (
          <FormStep
            stepNumber={2}
            title="First-Time Applicant"
            icon={<UserCheck className="h-6 w-6" />}
            onNext={handleNext}
            onPrevious={handlePrevious}
            nextDisabled={formData.firstTimeApplicant === null}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Is this your first time applying for ebola emergency funds?
              </p>
              <RadioGroup
                name="firstTimeApplicant"
                value={formData.firstTimeApplicant?.toString()}
                onValueChange={(val) =>
                  updateFormData({ firstTimeApplicant: val === "true" })
                }
              >
                <RadioGroupItem
                  value="true"
                  id="first-time-yes"
                  label="Yes, this is my first time"
                />
                <RadioGroupItem
                  value="false"
                  id="first-time-no"
                  label="No, I've applied before"
                />
              </RadioGroup>
            </div>
          </FormStep>
        );

      case 3:
        return (
          <FormStep
            stepNumber={3}
            title="Source of Information"
            icon={<Users className="h-6 w-6" />}
            onNext={handleNext}
            onPrevious={handlePrevious}
            nextDisabled={
              formData.heardAboutFunds === "" ||
              (formData.heardAboutFunds === "Other" &&
                formData.otherSource.trim() === "")
            }
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                Where did you hear about our ebola emergency funds?
              </p>
              <RadioGroup
                name="heardAboutFunds"
                value={formData.heardAboutFunds}
                onValueChange={(val) => updateFormData({ heardAboutFunds: val })}
              >
                {HEARD_ABOUT_OPTIONS.map((option) => (
                  <RadioGroupItem
                    key={option.value}
                    value={option.value}
                    id={`source-${option.value.toLowerCase().replace(/\s+/g, "-")}`}
                    label={option.label}
                  />
                ))}
              </RadioGroup>

              {formData.heardAboutFunds === "Other" && (
                <div className="mt-4">
                  <Textarea
                    label="Please specify"
                    placeholder="Tell us how you heard about us"
                    value={formData.otherSource}
                    onChange={(e) => updateFormData({ otherSource: e.target.value })}
                    rows={3}
                  />
                </div>
              )}
            </div>
          </FormStep>
        );

      case 4:
        return (
          <FormStep
            stepNumber={4}
            title="Occupation"
            icon={<Briefcase className="h-6 w-6" />}
            onNext={handleNext}
            onPrevious={handlePrevious}
            nextDisabled={
              formData.occupation === "" ||
              (formData.occupation === "Other" &&
                formData.otherOccupation.trim() === "")
            }
          >
            <div className="space-y-4">
              <p className="text-gray-700">What is your occupation?</p>
              <RadioGroup
                name="occupation"
                value={formData.occupation}
                onValueChange={(val) => updateFormData({ occupation: val })}
              >
                {OCCUPATION_OPTIONS.map((option) => (
                  <RadioGroupItem
                    key={option.value}
                    value={option.value}
                    id={`occupation-${option.value.toLowerCase().replace(/\s+/g, "-")}`}
                    label={option.label}
                  />
                ))}
              </RadioGroup>

              {formData.occupation === "Other" && (
                <div className="mt-4">
                  <Input
                    label="Please specify your occupation"
                    placeholder="Enter your occupation"
                    value={formData.otherOccupation}
                    onChange={(e) =>
                      updateFormData({ otherOccupation: e.target.value })
                    }
                  />
                </div>
              )}
            </div>
          </FormStep>
        );

      case 5:
        return (
          <FormStep
            stepNumber={5}
            title="Important Notice"
            icon={<Shield className="h-6 w-6" />}
            onNext={handleNext}
            onPrevious={handlePrevious}
            nextLabel="I Acknowledge & Understand"
          >
            <div className="space-y-6">
              <Alert
                variant="warning"
                title="⚠️ IMPORTANT NOTICE"
                description="This fund is purposefully designed for supporting individuals and communities affected by Ebola."
              />

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-gray-900 mb-3">
                  This fund supports:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                  <li>Ebola victims</li>
                  <li>Families affected by Ebola</li>
                  <li>Friends of victims</li>
                  <li>Communities affected by Ebola outbreak</li>
                </ul>
              </div>

              <p className="text-sm text-gray-600">
                By clicking "I Acknowledge", you confirm that you meet one of these
                criteria and will use funds appropriately.
              </p>
            </div>
          </FormStep>
        );

      case 6:
        return (
          <FormStep
            stepNumber={6}
            title="Personal Information"
            subtitle="Please provide your details"
            icon={<FileCheck className="h-6 w-6" />}
            onNext={handleNext}
            onPrevious={handlePrevious}
            nextDisabled={
              formData.fullName.trim() === "" ||
              formData.age === "" ||
              parseInt(formData.age) <= 0 ||
              parseInt(formData.age) > 150
            }
          >
            <div className="space-y-4">
              <Input
                id="fullName"
                label="Full Names *"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => updateFormData({ fullName: e.target.value })}
                error={
                  formData.fullName.trim() === "" && formData.fullName !== ""
                    ? "Full name is required"
                    : undefined
                }
              />

              <Input
                id="age"
                label="Age *"
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => updateFormData({ age: e.target.value })}
                error={
                  formData.age !== "" &&
                  (parseInt(formData.age) <= 0 || parseInt(formData.age) > 150)
                    ? "Age must be between 1 and 150"
                    : undefined
                }
                min={1}
                max={150}
              />

              <Input
                id="email"
                label="Email Address (Optional but recommended)"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
                helperText="We'll use this to send you updates about your application"
              />

              <Input
                id="phoneNumber"
                label="Phone Number (Optional but recommended)"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
                helperText="Include country code for international numbers"
              />
            </div>
          </FormStep>
        );

      case 7:
        return (
          <FormStep
            stepNumber={7}
            title="Country Selection"
            icon={<Users className="h-6 w-6" />}
            onNext={handleNext}
            onPrevious={handlePrevious}
            nextDisabled={formData.country === ""}
          >
            <CountrySelect
              value={formData.country}
              onValueChange={(val) => updateFormData({ country: val })}
              error={formData.country === "" ? "Please select your country" : undefined}
            />
          </FormStep>
        );

      case 8:
        return (
          <FormStep
            stepNumber={8}
            title="Location Details"
            icon={<Shield className="h-6 w-6" />}
            onNext={handleNext}
            onPrevious={handlePrevious}
            nextDisabled={formData.stateTown.trim().length < 2}
          >
            <div className="space-y-4">
              <Input
                id="stateTown"
                label="Where are you located? (State/Province/Town) *"
                placeholder="Enter your state, province, or town"
                value={formData.stateTown}
                onChange={(e) => updateFormData({ stateTown: e.target.value })}
                error={
                  formData.stateTown.trim().length > 0 &&
                  formData.stateTown.trim().length < 2
                    ? "Location must be at least 2 characters"
                    : undefined
                }
              />

              <p className="text-xs text-gray-500">
                This helps us understand where assistance is needed most.
              </p>
            </div>
          </FormStep>
        );

      case 9:
        return (
          <FormStep
            stepNumber={9}
            title="Review Your Application"
            subtitle="Please review your information before submitting"
            icon={<FileCheck className="h-6 w-6" />}
            onNext={handleSubmit}
            onPrevious={handlePrevious}
            nextLabel="Submit Application"
            isLoading={isSubmitting}
          >
            <div className="space-y-6">
              <Alert
                variant="info"
                description="Please review your information below. Make sure everything is correct before submitting."
              />

              {/* Application Summary */}
              <div className="space-y-4">
                {[
                  {
                    label: "First-Time Applicant",
                    value: formData.firstTimeApplicant ? "Yes" : "No",
                    step: 2,
                  },
                  {
                    label: "Heard About Funds",
                    value:
                      formData.heardAboutFunds === "Other"
                        ? formData.otherSource
                        : formData.heardAboutFunds,
                    step: 3,
                  },
                  {
                    label: "Occupation",
                    value:
                      formData.occupation === "Other"
                        ? formData.otherOccupation
                        : formData.occupation,
                    step: 4,
                  },
                  {
                    label: "Full Name",
                    value: formData.fullName,
                    step: 6,
                  },
                  {
                    label: "Age",
                    value: formData.age,
                    step: 6,
                  },
                  {
                    label: "Email",
                    value: formData.email || "Not provided",
                    step: 6,
                  },
                  {
                    label: "Phone Number",
                    value: formData.phoneNumber || "Not provided",
                    step: 6,
                  },
                  {
                    label: "Country",
                    value: formData.country,
                    step: 7,
                  },
                  {
                    label: "Location",
                    value: formData.stateTown,
                    step: 8,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {item.value}
                      </p>
                    </div>
                    <button
                      onClick={() => handleEditStep(item.step)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </button>
                  </div>
                ))}
              </div>

              {/* Cancel Button */}
              <div className="pt-4">
                <button
                  onClick={handleCancel}
                  className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  Cancel Application
                </button>
              </div>
            </div>
          </FormStep>
        );

      case 10:
        return (
          <div className="w-full max-w-2xl mx-auto">
            <div className="mb-8">
              <ProgressIndicator currentStep={10} />
            </div>

            <Card variant="elevated" className="text-center">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-100 rounded-full">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  ✅ Application Submitted Successfully!
                </h2>

                <p className="text-gray-600 mb-6">
                  Thank you for your application. We've received your information and will
                  review it shortly.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-xs text-gray-600 mb-1">Your Application ID</p>
                  <p className="text-2xl font-bold text-blue-600 font-mono">
                    {applicationId}
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">Next Steps:</p>
                  <ul className="text-sm text-gray-600 space-y-2 text-left">
                    <li>• Your application will be reviewed within 5-7 business days</li>
                    <li>• You'll receive an email confirmation if you provided an email</li>
                    <li>• Our team may contact you for additional information</li>
                    <li>• You'll be notified once a decision has been made</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      // In a real app, this would download a PDF
                      toast.info("PDF download feature coming soon!");
                    }}
                  >
                    <Download className="h-4 w-4" />
                    Download Confirmation
                  </Button>

                  <Button
                    className="w-full"
                    onClick={() => {
                      setFormData(initialFormData);
                      setCurrentStep(1);
                      setApplicationId(null);
                    }}
                  >
                    Return to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {renderStep()}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Cancel Application?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Are you sure you want to cancel? All your information will be lost.
              </p>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowCancelModal(false)}
                >
                  No, Continue
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmCancel}
                >
                  Yes, Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default OnboardingForm;
