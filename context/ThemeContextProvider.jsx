import React, { createContext, useState } from "react";
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export default ThemeContext;

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((th) => (th === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
