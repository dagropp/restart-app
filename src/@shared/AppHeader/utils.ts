import { Theme } from '@mui/material';

export const getBgColor = (theme: Theme) =>
  theme.palette.mode === 'dark'
    ? theme.palette.action.selected
    : theme.palette.text.primary;
