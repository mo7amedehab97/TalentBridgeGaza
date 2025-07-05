import React from "react";

interface TitleProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "text-xl md:text-2xl font-medium text-dark-gray",
  md: "text-2xl md:text-3xl font-semibold text-dark-gray",
  lg: "text-3xl md:text-4xl font-bold text-dark-gray",
  xl: "text-4xl md:text-5xl font-bold text-dark-gray",
};

const Title: React.FC<TitleProps> = ({
  children,
  size = "xl",
  className = "",
}) => {
  return <h1 className={`${sizeMap[size]} ${className}`}>{children}</h1>;
};

export default Title;
