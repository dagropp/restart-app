import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslations, useTranslationsContext } from '@translations';

import Button from '../Button';
import { type DialogProps } from './types';

const Dialog = ({
  children,
  open,
  onClose,
  success,
  cancel,
  title,
  actionsClassName,
  ...props
}: DialogProps) => {
  const translations = useTranslations().common;
  const { isRtl } = useTranslationsContext();

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
          <DialogContentText dir={isRtl ? 'rtl' : 'ltr'}>
            {children}
          </DialogContentText>
        ) : (
          children
        )}
      </DialogContent>
      <DialogActions className={actionsClassName}>
        {cancel && (
          <Button
            onClick={handleCancel}
            variant="outlined"
            disabled={
              typeof cancel !== 'boolean' ? cancel?.disabled : undefined
            }
          >
            {typeof cancel !== 'boolean'
              ? (cancel?.label ?? translations.cancel)
              : translations.cancel}
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
              ? (success?.label ?? translations.ok)
              : translations.ok}
          </Button>
        )}
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
