import React, { createContext, useContext, useState } from 'react'; // Импортируйте createContext и useState

// Создание контекста
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

// Провайдер контекста
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Хук для использования контекста
export const useTheme = () => useContext(ThemeContext);
