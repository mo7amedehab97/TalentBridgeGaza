import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  required?: boolean;
  disabled?: boolean;
  helpText?: string;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  required = false,
  disabled = false,
  helpText,
  className = "",
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-primary-blue font-medium mb-2 text-sm">
          {label}
          {required && <span className="text-alert-red"> *</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center mb-2 cursor-pointer"
              >
                <input
                  type="radio"
                  id={`${name}-${option.value}`}
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  disabled={disabled}
                  className="mr-2 accent-primary-blue"
                />
                <label
                  htmlFor={`${name}-${option.value}`}
                  className="text-text-secondary text-sm cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      />

      {error && (
        <div className="text-error-text text-xs mt-1">
          {error.message as string}
        </div>
      )}

      {helpText && !error && (
        <div className="text-text-muted text-xs mt-1">{helpText}</div>
      )}
    </div>
  );
};
