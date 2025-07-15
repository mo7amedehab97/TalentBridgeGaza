import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  to?: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    variant = "primary",
    size = "md",
    type = "button",
    disabled = false,
    onClick,
    className = "",
  } = props;

  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium text-sm leading-none border border-transparent cursor-pointer transition-all duration-150 ease-in-out text-decoration-none min-h-[2.5rem]";

  const variantClasses = {
    primary:
      "bg-primary-blue text-white border-primary-blue hover:bg-primary-blue-hover hover:border-primary-blue-hover disabled:bg-disabled disabled:text-disabled-text disabled:border-disabled",
    outline:
      "bg-white text-primary-blue border-primary hover:bg-primary-blue-hover hover:border-primary-blue-hover hover:text-white disabled:bg-disabled disabled:text-disabled-text disabled:border-disabled",
    secondary:
      "bg-accent-green text-white border-accent-green hover:bg-accent-green-hover hover:border-accent-green-hover",
    destructive:
      "bg-alert-red text-white border-alert-red hover:bg-hover-red hover:border-hover-red",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs min-h-8",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-base min-h-12",
  };

  const disabledClasses = disabled ? "opacity-60 cursor-not-allowed" : "";

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const to = props.to;

  if (to) {
    return (
      <a
        href={to}
        className={classes}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
