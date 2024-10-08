import { createTheme, PaletteMode } from "@mui/material/styles";
import { useMemo, useState } from "react";
import theme from "./theme";

export const useColorTheme = () => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  };

  const modifiedTheme = useMemo(
    () => 
      createTheme({
        ...theme,
        palette: {
          ...theme.palette,
          mode,
        },
      }),
    [mode]
  )

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  }
}