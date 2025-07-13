import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { useTranslationsContext } from '@translations';

import { AUTO_HIDE_DURATION } from './constants';
import { type ToastProps } from './types';

const Toast = ({
  open,
  onClose,
  autoHide = true,
  severity = 'info',
  ...props
}: ToastProps) => {
  const { isRtl } = useTranslationsContext();
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
          dir={isRtl ? 'rtl' : 'ltr'}
          slotProps={{ icon: { className: '!mr-0 me-2' } }}
          {...props}
        />
      }
    </Snackbar>
  );
};

export default Toast;
