import React from "react";

interface AlertProps {
  type: "success" | "error" | "warning";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  children,
  className = "",
}) => {
  const typeClasses = {
    success: "bg-success-bg text-success-text border-success-text",
    error: "bg-error-bg text-error-text border-error-text",
    warning: "bg-warning-bg text-warning-text border-warning-text",
  };

  const classes = [
    "p-4 rounded-md mb-4 border border-transparent",
    typeClasses[type],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {title && <div className="font-semibold mb-2">{title}</div>}
      <div>{children}</div>
    </div>
  );
};
