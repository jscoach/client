import React from "react";

const Index = ({title, children,className}) => (
  <div className={className}>
    <h3 className="mb-2 font-normal tracking-wide text-xs uppercase text-gray-600 select-none">{title}</h3>
    {children}
  </div>
);

export default Index;
