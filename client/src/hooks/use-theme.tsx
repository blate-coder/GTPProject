import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';

type ThemeType = 'default' | 'sakura' | 'night';

type ThemeContextType = {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themeClass: string;
  applyThemeStyles: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('default');
  
  // Update theme when user profile changes
  useEffect(() => {
    if (user?.profileTheme && ['default', 'sakura', 'night'].includes(user.profileTheme)) {
      setCurrentTheme(user.profileTheme as ThemeType);
    }
  }, [user]);
  
  // Apply theme class to body element
  useEffect(() => {
    applyThemeStyles();
  }, [currentTheme]);
  
  // Initial theme application
  useEffect(() => {
    applyThemeStyles();
  }, []);
  
  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
  };
  
  const getThemeClass = (): string => {
    switch (currentTheme) {
      case 'sakura':
        return 'theme-sakura';
      case 'night':
        return 'theme-night';
      default:
        return 'theme-default';
    }
  };
  
  const applyThemeStyles = () => {
    // Remove any existing theme classes
    document.body.classList.remove('theme-default', 'theme-sakura', 'theme-night');
    
    // Add current theme class
    const themeClass = getThemeClass();
    document.body.classList.add(themeClass);
    
    // Apply theme-specific styles
    if (currentTheme === 'sakura') {
      document.documentElement.style.setProperty('--primary', '#F9A8D4');
      document.documentElement.style.setProperty('--background', '#FDF2F8');
      document.documentElement.style.setProperty('--card', '#FCE7F3');
      document.documentElement.style.setProperty('--primary-foreground', '#7D1D49');
      document.documentElement.style.setProperty('--border', '#F9A8D4');
      document.documentElement.style.setProperty('--ring', '#F472B6');
    } else if (currentTheme === 'night') {
      document.documentElement.style.setProperty('--primary', '#3B82F6');
      document.documentElement.style.setProperty('--background', '#0F172A');
      document.documentElement.style.setProperty('--card', '#1E293B');
      document.documentElement.style.setProperty('--primary-foreground', '#FFFFFF');
      document.documentElement.style.setProperty('--border', '#334155');
      document.documentElement.style.setProperty('--ring', '#3B82F6');
    } else {
      // Default theme - reset to theme.json values
      document.documentElement.style.removeProperty('--primary');
      document.documentElement.style.removeProperty('--background');
      document.documentElement.style.removeProperty('--card');
      document.documentElement.style.removeProperty('--primary-foreground');
      document.documentElement.style.removeProperty('--border');
      document.documentElement.style.removeProperty('--ring');
    }
  };
  
  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      setTheme, 
      themeClass: getThemeClass(),
      applyThemeStyles
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}