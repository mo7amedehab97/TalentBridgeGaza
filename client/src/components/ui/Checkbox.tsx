import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface CheckboxProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  helpText?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
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
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex items-center mb-2 cursor-pointer">
            <input
              type="checkbox"
              id={name}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              disabled={disabled}
              className="mr-2 accent-primary-blue"
            />
            <label
              htmlFor={name}
              className="text-text-secondary text-sm cursor-pointer"
            >
              {label}
              {required && <span className="text-alert-red"> *</span>}
            </label>
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
