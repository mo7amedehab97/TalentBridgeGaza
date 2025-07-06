import React from "react";

interface BadgeProps {
  variant: "applied" | "pending" | "rejected" | "remote";
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant,
  children,
  className = "",
}) => {
  const variantClasses = {
    applied: "bg-accent-green text-white",
    pending: "bg-light-gray text-dark-gray",
    rejected: "bg-alert-red text-white",
    remote: "bg-primary-blue text-white",
  };

  const classes = [
    "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wider",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
};
