import { type SelectProps as MuiSelectProps } from '@mui/material/Select';
import { type ReactNode } from 'react';

export interface SelectOption<T = unknown> {
  value: T;
  label?: ReactNode;
}

export type SelectProps<T = unknown> = Omit<
  MuiSelectProps<T>,
  'onChange' | 'children'
> & {
  options: SelectOption<T | unknown>[];
  onChange?: (value: T) => void;
  placeholder?: ReactNode;
};
