import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface FormProps<T extends z.ZodType> {
  schema: T;
  onSubmit: SubmitHandler<z.infer<T>>;
  children: React.ReactNode;
  defaultValues?: Partial<z.infer<T>>;
  className?: string;
}

export function Form<T extends z.ZodType>({
  schema,
  onSubmit,
  children,
  defaultValues,
  className = "",
}: FormProps<T>) {
  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

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
