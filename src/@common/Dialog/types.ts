import { DialogProps as MuiDialogProps } from '@mui/material/Dialog';

type ActionProps =
  | {
      label?: string;
      onAction?: () => void;
      disabled?: boolean;
    }
  | boolean;

export interface DialogProps extends Omit<MuiDialogProps, 'onClose'> {
  onClose: () => void;
  success?: ActionProps;
  cancel?: ActionProps;
  title?: string;
  actionsClassName?: string;
}
