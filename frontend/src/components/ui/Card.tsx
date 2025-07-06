import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  meta?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  meta,
  className = "",
}) => {
  return (
    <div
      className={`bg-bg-secondary border border-border-light rounded-lg p-6 shadow-sm transition-shadow duration-150 ease-in-out hover:shadow-md ${className}`}
    >
      {(title || meta) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-primary-blue text-lg font-semibold mb-2">
              {title}
            </h3>
          )}
          {meta && <div className="text-text-muted text-sm">{meta}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};
