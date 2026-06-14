import React from "react";
import { HelpCircle, UserCheck, Users, Shield, UserPlus, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepConfig {
  stepNumber: number;
  title: string;
  icon: React.ReactNode;
}

const steps: StepConfig[] = [
  { stepNumber: 1, title: "Welcome", icon: <HelpCircle className="h-4 w-4" /> },
  { stepNumber: 2, title: "First-Time", icon: <UserCheck className="h-4 w-4" /> },
  { stepNumber: 3, title: "Source", icon: <Users className="h-4 w-4" /> },
  { stepNumber: 4, title: "Occupation", icon: <UserPlus className="h-4 w-4" /> },
  { stepNumber: 5, title: "Notice", icon: <Shield className="h-4 w-4" /> },
  { stepNumber: 6, title: "Personal Info", icon: <FileCheck className="h-4 w-4" /> },
  { stepNumber: 7, title: "Country", icon: <Users className="h-4 w-4" /> },
  { stepNumber: 8, title: "Location", icon: <Shield className="h-4 w-4" /> },
  { stepNumber: 9, title: "Review", icon: <FileCheck className="h-4 w-4" /> },
  { stepNumber: 10, title: "Complete", icon: <UserCheck className="h-4 w-4" /> },
];

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  className?: string;
  showLabels?: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps = 10,
  className,
  showLabels = true,
}) => {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop horizontal layout */}
      <div className="hidden lg:flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.stepNumber < currentStep;
          const isCurrent = step.stepNumber === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.stepNumber}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                    isCompleted && "bg-blue-600 border-blue-600 text-white",
                    isCurrent && "bg-blue-100 border-blue-600 text-blue-600 ring-2 ring-blue-600 ring-offset-2",
                    !isCompleted && !isCurrent && "bg-gray-100 border-gray-300 text-gray-400"
                  )}
                >
                  {step.icon}
                </div>
                {showLabels && (
                  <span
                    className={cn(
                      "mt-2 text-xs font-medium text-center",
                      isCurrent ? "text-blue-600" : "text-gray-500"
                    )}
                  >
                    {step.title}
                  </span>
                )}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 transition-colors",
                    isCompleted ? "bg-blue-600" : "bg-gray-200"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile simplified layout */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
           step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-blue-600 font-semibold">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export { ProgressIndicator };
