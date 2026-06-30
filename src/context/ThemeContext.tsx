import { PropsWithChildren, createContext, useContext, useMemo, useState } from "react";
import { ThemeMode, darkPalette, lightPalette, ThemePalette } from "../theme";

type ThemeContextValue = {
  mode: ThemeMode;
  palette: ThemePalette;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("pt-golden-ib-theme");
      if (saved === "dark" || saved === "light") {
        return saved;
      }
    }
    return "dark";
  });

  const value = useMemo<ThemeContextValue>(() => {
    return {
      mode,
      palette: mode === "dark" ? darkPalette : lightPalette,
      toggleTheme: () =>
        setMode((current) => {
          const next = current === "dark" ? "light" : "dark";
          if (typeof window !== "undefined") {
            window.localStorage.setItem("pt-golden-ib-theme", next);
          }
          return next;
        }),
      setMode
    };
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return value;
}
