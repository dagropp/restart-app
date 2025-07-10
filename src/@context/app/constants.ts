import { createTheme } from '@mui/material/styles';
import { ThemeType } from '@root/types';

export const appThemes = {
  [ThemeType.Dark]: createTheme({ palette: { mode: 'dark' } }),
  [ThemeType.Light]: createTheme({ palette: { mode: 'light' } }),
};
