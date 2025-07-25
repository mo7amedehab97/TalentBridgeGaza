"use client";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface TextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  helpText?: string;
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  placeholder,
  rows = 4,
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
        <label
          htmlFor={name}
          className="block text-primary-blue font-medium mb-2 text-sm"
        >
          {label}
          {required && <span className="text-alert-red"> *</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            id={name}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full px-3 py-3 border border-border-medium rounded-md bg-bg-secondary text-text-primary text-sm transition-all duration-150 ease-in-out focus:outline-none focus:border-border-focus focus:shadow-[0_0_0_3px_rgba(74,144,226,0.1)] placeholder:text-text-muted disabled:bg-bg-primary disabled:text-text-muted disabled:cursor-not-allowed resize-vertical ${
              error ? "border-alert-red" : ""
            }`}
          />
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
