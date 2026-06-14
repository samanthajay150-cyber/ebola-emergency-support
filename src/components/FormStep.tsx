import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { cn } from "@/lib/utils";

interface FormStepProps {
  stepNumber: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onNext?: () => void;
  onPrevious?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  showPrevious?: boolean;
  previousLabel?: string;
  className?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const FormStep: React.FC<FormStepProps> = ({
  stepNumber,
  title,
  subtitle,
  children,
  onNext,
  onPrevious,
  nextDisabled = false,
  nextLabel = "Continue",
  showPrevious = true,
  previousLabel = "Go Back",
  className,
  isLoading = false,
  icon,
}) => {
  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      {/* Progress indicator */}
      <div className="mb-8">
        <ProgressIndicator currentStep={stepNumber} />
      </div>

      {/* Card container */}
      <Card variant="elevated">
        <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-xl">
          <div className="flex items-center gap-3">
            {icon && <div className="p-2 bg-white/20 rounded-lg">{icon}</div>}
            <div>
              <CardTitle className="text-2xl text-white">{title}</CardTitle>
              {subtitle && (
                <p className="mt-1 text-sm text-blue-100">{subtitle}</p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {children}
          
          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            {showPrevious ? (
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={isLoading}
                type="button"
              >
                {previousLabel}
              </Button>
            ) : (
              <div />
            )}
            
            <Button
              onClick={onNext}
              disabled={nextDisabled || isLoading}
              loading={isLoading}
              type="button"
            >
              {nextLabel}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { FormStep };
