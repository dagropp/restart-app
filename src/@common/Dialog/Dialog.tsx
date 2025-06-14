import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Button from '../Button';
import { DEFAULT_CANCEL, DEFAULT_SUCCESS } from './constants';
import { type DialogProps } from './types';

const Dialog = ({
  children,
  open,
  onClose,
  success,
  cancel,
  title,
  ...props
}: DialogProps) => {
  const handleSuccess = () => {
    if (typeof success !== 'boolean') success?.onAction?.();
    onClose();
  };

  const handleCancel = () => {
    if (typeof cancel !== 'boolean') cancel?.onAction?.();
    onClose();
  };

  return (
    <MuiDialog open={open} onClose={onClose} {...props} aria-hidden={!open}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {typeof children === 'string' ? (
          <DialogContentText>{children}</DialogContentText>
        ) : (
          children
        )}
      </DialogContent>
      <DialogActions>
        {cancel && (
          <Button
            onClick={handleCancel}
            variant="outlined"
            disabled={
              typeof cancel !== 'boolean' ? cancel?.disabled : undefined
            }
          >
            {typeof cancel !== 'boolean'
              ? (cancel?.label ?? DEFAULT_CANCEL)
              : DEFAULT_CANCEL}
          </Button>
        )}
        {success && (
          <Button
            onClick={handleSuccess}
            variant="contained"
            disabled={
              typeof success !== 'boolean' ? success?.disabled : undefined
            }
          >
            {typeof success !== 'boolean'
              ? (success?.label ?? DEFAULT_SUCCESS)
              : DEFAULT_SUCCESS}
          </Button>
        )}
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
