"use client";
import React from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  DefaultValues,
} from "react-hook-form";
import { z } from "zod";

interface FormProps<T extends z.ZodTypeAny> {
  onSubmit: SubmitHandler<z.infer<T>>;
  children: React.ReactNode;
  defaultValues?: Partial<z.infer<T>>;
  className?: string;
}

export function Form<T extends z.ZodTypeAny>({
  onSubmit,
  children,
  defaultValues,
  className = "",
}: FormProps<T>) {
  const methods = useForm<z.infer<T>>({
    defaultValues: defaultValues as DefaultValues<z.infer<T>>,
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}

// Export the useFormContext hook for convenience
export { useFormContext } from "react-hook-form";
