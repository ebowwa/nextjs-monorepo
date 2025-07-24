import React, { createContext, useContext, useState } from 'react';
import { colors } from '../theme';  // Import your existing colors

export interface Theme {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  textOnPrimary: string;
  error: string;
}

// Use your existing color scheme
export const lightTheme: Theme = {
  primary: colors.primary,
  accent: colors.accent,
  background: colors.background,
  surface: colors.surface,
  text: colors.text,
  textSecondary: colors.textSecondary,
  textOnPrimary: colors.white,
  error: colors.error
};

export const darkTheme: Theme = {
  primary: colors.primary,
  accent: colors.accent,
  background: colors.background,
  surface: colors.surface,
  text: colors.text,
  textSecondary: colors.textSecondary,
  textOnPrimary: colors.white,
  error: colors.error
};

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
