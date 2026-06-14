import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
  showLabel?: boolean;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className,
  indicatorClassName,
  showLabel = false,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={cn(
            "h-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-500 ease-out rounded-full",
            indicatorClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <span>Progress</span>
          <span className="font-medium">{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  );
};

export { Progress };
