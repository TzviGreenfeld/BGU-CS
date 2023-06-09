import React, { createContext, useState } from "react";
const TokenContext = createContext({
    token: "",
    userName: "",
    setTokenData: () => {},
});

export default TokenContext;

export const TokenContextProvider = ({ children }) => {

  const setTokenData = () => {
    setTheme((th) => (th === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
