import React from "react";

const lightText = "#fff";
const darkText = "#2b2b2b";
const darkPageBackground = "#333944";
const lightPageBackground = "#e8ecf4";
const darkRowBackground = "#898f99";
const lightRowBackground = "#eee";

const themes = {
  dark: {
    pageBackground: darkPageBackground,
    rowBackground: darkRowBackground,
    textColor: lightText
  },
  light: {
    pageBackground: lightPageBackground,
    rowBackground: lightRowBackground,
    textColor: darkText
  }
};

const ThemeContext = React.createContext({
  theme: { ...themes.dark },
  toggleTheme: () => {}
});

// const useTheme = () => React.useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [currentTheme, setTheme] = React.useState(themes.dark);

  const toggleTheme = () => {
    setTheme(currentTheme =>
      currentTheme === themes.dark ? themes.light : themes.dark
    );
  };

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
