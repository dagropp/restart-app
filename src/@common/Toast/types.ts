import { AlertProps } from '@mui/material/Alert';
import type { ReactNode } from 'react';

export interface ToastProps extends Omit<AlertProps, 'severity'> {
  open: boolean;
  onClose: () => void;
  autoHide?: boolean;
  severity?: AlertProps['severity'] | 'pending';
}

export type ToastState = {
  message: ReactNode;
  severity?: ToastProps['severity'];
  autoHide?: boolean;
} | null;
