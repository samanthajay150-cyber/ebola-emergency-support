import React from "react";
import { cn } from "@/lib/utils";

interface RadioGroupProps {
  name: string;
  value?: string | boolean;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

interface RadioGroupItemProps {
  value: string | boolean;
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

const RadioGroupContext = React.createContext<{
  name: string;
  value?: string | boolean;
  onValueChange?: (value: string) => void;
}>({
  name: "",
});

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onValueChange,
  className,
  children,
}) => {
  return (
    <RadioGroupContext.Provider value={{ name, value, onValueChange }}>
      <div className={cn("space-y-3", className)} role="radiogroup">
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  value,
  id,
  label,
  description,
  disabled = false,
  className,
}) => {
  const context = React.useContext(RadioGroupContext);
  const isChecked = String(context.value) === String(value);

  const handleChange = () => {
    if (!disabled && context.onValueChange) {
      context.onValueChange(String(value));
    }
  };

  return (
    <label
      htmlFor={id}
      className={cn(
        "relative flex cursor-pointer rounded-lg border p-4 transition-all",
        isChecked
          ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <input
        type="radio"
        id={id}
        name={context.name}
        value={String(value)}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
      />
      <div className="flex flex-1 items-start gap-3">
        <div
          className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            isChecked ? "border-blue-600 bg-blue-600" : "border-gray-300"
          )}
        >
          {isChecked && (
            <div className="h-2.5 w-2.5 rounded-full bg-white" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-900">{label}</p>
          {description && (
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          )}
        </div>
      </div>
    </label>
  );
};

export { RadioGroup, RadioGroupItem };
