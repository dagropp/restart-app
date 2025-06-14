import { CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { AUTO_HIDE_DURATION } from './constants';
import { type ToastProps } from './types';

const Toast = ({
  open,
  onClose,
  autoHide = true,
  severity = 'info',
  ...props
}: ToastProps) => {
  const isPending = severity === 'pending';

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHide ? AUTO_HIDE_DURATION : null}
    >
      {
        <Alert
          severity={isPending ? 'info' : severity}
          icon={isPending ? <CircularProgress size={16} /> : props.icon}
          {...props}
        />
      }
    </Snackbar>
  );
};

export default Toast;
