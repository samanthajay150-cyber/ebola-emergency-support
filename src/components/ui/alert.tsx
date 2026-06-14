import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";

interface AlertProps {
  title?: string;
  description?: string;
  variant?: "info" | "success" | "warning" | "error";
  className?: string;
  children?: React.ReactNode;
}

const variantStyles = {
  info: {
    container: "bg-blue-50 border-blue-200 text-blue-900",
    icon: <Info className="h-5 w-5 text-blue-600" />,
  },
  success: {
    container: "bg-green-50 border-green-200 text-green-900",
    icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
  },
  warning: {
    container: "bg-orange-50 border-orange-200 text-orange-900",
    icon: <AlertTriangle className="h-5 w-5 text-orange-600" />,
  },
  error: {
    container: "bg-red-50 border-red-200 text-red-900",
    icon: <AlertCircle className="h-5 w-5 text-red-600" />,
  },
};

const Alert: React.FC<AlertProps> = ({
  title,
  description,
  variant = "info",
  className,
  children,
}) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        styles.container,
        className
      )}
      role="alert"
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0">{styles.icon}</div>
        <div className="flex-1">
          {title && (
            <h3 className="font-semibold text-sm mb-1">{title}</h3>
          )}
          {description && (
            <p className="text-sm opacity-90">{description}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export { Alert };
