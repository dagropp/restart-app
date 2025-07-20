import { alpha, Theme } from '@mui/material';

export const getCardBg = (theme: Theme): string => {
  const start = alpha(theme.palette.error.light, 0.3);
  const end = alpha(theme.palette.info.light, 0.3);
  return `linear-gradient(to right, ${start}, ${end})`;
};
