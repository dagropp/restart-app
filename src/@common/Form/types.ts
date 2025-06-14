import { HTMLProps } from 'react';

export interface FormProps<T extends object>
  extends Omit<HTMLProps<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (data: T) => void;
  resetOnSubmit?: boolean;
}
