import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  to?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

const baseStyles =
  "font-medium px-4 py-2 rounded transition-colors focus:outline-none inline-flex items-center justify-center";

const variants: Record<string, string> = {
  primary:
    "bg-primary-blue text-white hover:bg-primary-blue-hover border border-primary-blue",
  secondary:
    "bg-accent-green text-white hover:bg-accent-green-hover border border-accent-green",
  outline:
    "bg-transparent text-primary-blue border border-primary-blue hover:bg-primary-blue hover:text-white",
};

const Button: React.FC<ButtonProps> = ({
  children,
  to,
  variant = "primary",
  className = "",
  ...props
}) => {
  const style = `${baseStyles} ${
    variants[variant] || variants.primary
  } ${className}`;
  if (to) {
    return (
      <Link href={to} className={style}>
        {children}
      </Link>
    );
  }
  return (
    <button className={style} {...props}>
      {children}
    </button>
  );
};

export default Button;
