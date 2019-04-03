import React from "react";

const lightText = "#fff";
const darkText = "#2b2b2b";
const darkPageBackground = "#333944";
const lightPageBackground = "#c7cbd5";
const darkRowBackground = "#898f99";
const lightRowBackground = "#f5f5f5";

const themes = {
  dark: {
    toggleKey: "Light",
    pageBackground: darkPageBackground,
    rowBackground: darkRowBackground,
    buttonBackground: darkRowBackground,
    buttonColor: lightText,
    textColor: lightText
  },
  light: {
    toggleKey: "Dark",
    pageBackground: lightPageBackground,
    rowBackground: lightRowBackground,
    buttonBackground: darkPageBackground,
    buttonColor: lightText,
    textColor: darkText
  }
};

const ThemeContext = React.createContext({
  theme: {},
  toggleTheme: () => {}
});

const ThemeProvider = ({ children }) => {
  const [currentTheme, setTheme] = React.useState(themes.dark);

  const toggleTheme = () => {
    const theme = currentTheme === themes.dark ? themes.light : themes.dark;
    console.log("toggled theme in toggleTheme", theme);
    localStorage.setItem("theme", JSON.stringify(theme));
    setTheme(theme);
  };

  React.useEffect(() => {
    const theme = JSON.parse(localStorage.getItem("theme"));
    setTheme(theme);
  }, []);

  React.useEffect(() => {
    document.body.style.backgroundColor = currentTheme.pageBackground;
  }, [currentTheme.pageBackground]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
