import { createTheme, PaletteMode } from '@mui/material/styles';
import { useMemo, useState } from 'react';
import theme from './theme';

export const useColorTheme = () => {
  const storedMode = localStorage.getItem('colorTheme') as PaletteMode;
  const [mode, setMode] = useState<PaletteMode>(storedMode || 'light');

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('colorTheme', newMode);
      return newMode;
    });
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
    [mode],
  );

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};
