"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Theme, ThemeProviderContext } from "./context/ThemeContext";

// theme provider props
type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "melody-verse-theme",
}: ThemeProviderProps) {
  // state for theme
  const [theme, setTheme] = useState<Theme>(
    // getting the storage from local storage or using default theme(dark)
    (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  // setting theme as per selection
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    root.classList.add(theme);
  }, [theme]);

  // values to pass in context provider
  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
