import React, { useState, useEffect } from "react";
import { Select } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface Country {
  name: string;
  code: string;
  flag: string;
}

interface CountrySelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  error?: string;
  label?: string;
  placeholder?: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onValueChange,
  error,
  label = "Which country are you from?",
  placeholder = "Select your country",
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        setFetchError(null);
        
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,flags");
        
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        
        const data = await response.json();
        
        const formattedCountries: Country[] = data
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
            flag: country.flags?.emoji || getFlagEmoji(country.cca2),
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        
        setCountries(formattedCountries);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setFetchError("Unable to load countries. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const getFlagEmoji = (countryCode: string): string => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  if (isLoading) {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            {label}
          </label>
        )}
        <div className="flex items-center justify-center py-8 border border-gray-200 rounded-lg bg-gray-50">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading countries...</span>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            {label}
          </label>
        )}
        <div className="p-4 border border-red-200 rounded-lg bg-red-50 text-red-700">
          {fetchError}
        </div>
      </div>
    );
  }

  return (
    <Select
      name="country"
      options={countries.map((c) => ({
        value: c.code,
        label: c.name,
        flag: c.flag,
      }))}
      value={value}
      onValueChange={onValueChange}
      placeholder={placeholder}
      label={label}
      error={error}
    />
  );
};

export { CountrySelect };
