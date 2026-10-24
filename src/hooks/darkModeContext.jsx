import { createContext, useContext } from "react";
import { useLocalStorageState } from "./useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeContextProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode",
  );
  const handleDarkMode = () => setIsDarkMode((darkMode) => !darkMode);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, handleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === "undefined")
    throw new Error("Context of dark mode used in a wrong place");
  return context;
}

export { useDarkMode, DarkModeContextProvider };
