import { createContext } from "react";

// theme types
export type Theme = "dark" | "light";

// state type for theme provider
type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// initial state for context(default theme dark)
const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
};

// theme provider context
export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
