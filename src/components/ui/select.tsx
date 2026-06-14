import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
  flag?: string;
}

interface SelectProps {
  name: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  label,
  error,
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchFilter, setSearchFilter] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchFilter.toLowerCase())
  );

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchFilter("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onValueChange?.(optionValue);
    setIsOpen(false);
    setSearchFilter("");
  };

  return (
    <div className={cn("w-full", className)} ref={containerRef}>
      {label && (
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-lg border px-4 py-3 text-left transition-all",
            error
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
            disabled
              ? "cursor-not-allowed bg-gray-100 opacity-50"
              : "bg-white hover:border-gray-400",
            isOpen && "ring-2 ring-blue-500 border-blue-500"
          )}
        >
          <span className={cn(!selectedOption && "text-gray-400")}>
            {selectedOption ? (
              <span>
                {selectedOption.flag && <span className="mr-2">{selectedOption.flag}</span>}
                {selectedOption.label}
              </span>
            ) : (
              placeholder
            )}
          </span>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-gray-400 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="border-b border-gray-100 p-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <div className="max-h-60 overflow-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500">No results found</div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-gray-50",
                      value === option.value && "bg-blue-50 text-blue-600"
                    )}
                  >
                    {option.flag && <span>{option.flag}</span>}
                    <span className="flex-1">{option.label}</span>
                    {value === option.value && <Check className="h-4 w-4" />}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export { Select };
