import { createTheme, Theme } from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { useColorTheme } from "./use-color-theme";


type ThemeContextType = {
  mode: string;
  toggleColorMode: () => void;
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
  theme: createTheme()
})

export const ThemeContextProvaider: FC<PropsWithChildren> = ({ children }) => {
  const value = useColorTheme();

  return(
    <ThemeContext.Provider value={value}> {children} </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
  return useContext(ThemeContext)
}