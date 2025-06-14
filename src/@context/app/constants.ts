import { createTheme } from '@mui/material/styles';
import { ThemeType } from '@services/api';

export const appThemes = {
  [ThemeType.Dark]: createTheme({ palette: { mode: 'dark' } }),
  [ThemeType.Light]: createTheme({ palette: { mode: 'light' } }),
};

export const customThemes = {
  [ThemeType.Dark]: { bold: '' },
  [ThemeType.Light]: { bold: '' },
};
