import { type SelectProps as MuiSelectProps } from '@mui/material/Select';
import { type ReactNode } from 'react';

export interface SelectOption<T = unknown> {
  value: T;
  label?: ReactNode;
  disabled?: boolean;
}

export type SelectProps<T = unknown> = Omit<
  MuiSelectProps<T>,
  'onChange' | 'children'
> & {
  onChange?: (value: T) => void;
  placeholder?: ReactNode;
} & (
    | { options: SelectOption<T | unknown>[]; children?: never }
    | { children: ReactNode; options?: never }
  );
