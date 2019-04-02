import React from "react";
import { ThemeContext } from "./ThemeContext";

export default ({ onClick, children, type }) => {
  const theme = React.useContext(ThemeContext);
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        backgroundColor: theme.currentTheme.buttonBackground,
        color: theme.currentTheme.buttonColor
      }}
    >
      {children}
    </button>
  );
};
