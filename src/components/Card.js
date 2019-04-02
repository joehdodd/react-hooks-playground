import React from "react";

export default ({ children, className, theme }) => (
  <div
    style={{ backgroundColor: theme.rowBackground, color: theme.textColor }}
    className={`card-wrapper ${className}`}
  >
    {children}
  </div>
);
