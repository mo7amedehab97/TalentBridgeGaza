import React from "react";

const Container: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="max-w-[90vw] mx-auto">{children}</div>
);

export default Container;
