import { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip';
import { ReactNode } from 'react';

export interface TooltipProps extends Omit<MuiTooltipProps, 'title'> {
  title?: ReactNode;
}
