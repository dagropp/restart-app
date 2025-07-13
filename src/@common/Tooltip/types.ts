import { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip';
import { TypographyProps } from '@mui/material/Typography';
import { ReactNode } from 'react';

export interface TooltipProps extends Omit<MuiTooltipProps, 'title'> {
  title?: ReactNode;
}

export interface TooltipWrapperProps
  extends Omit<TypographyProps, 'variant' | 'children'> {
  tooltipContent?: ReactNode;
}
