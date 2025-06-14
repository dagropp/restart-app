import { RatingProps as MuiRatingProps } from '@mui/material/Rating';
import { ReactNode } from 'react';

export interface RatingProps extends MuiRatingProps {
  tooltip?: ReactNode | boolean;
  base?: number;
}
