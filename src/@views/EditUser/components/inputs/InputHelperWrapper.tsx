import Typography from '@common/Typography';
import { alpha } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import { useTranslationsContext } from '@translations';
import clsx from 'clsx';
import { CSSProperties, ReactNode, useState } from 'react';

import classes from './input-helper.module.css';

interface Props {
  text: string;
  show?: boolean;
  children?: ReactNode;
  bottomSpacing?: boolean;
}

export const InputHelperWrapper = ({ show, text, children }: Props) => {
  const { isRtl } = useTranslationsContext();
  const theme = useTheme();

  const [showHelperManually, setShowHelperManually] = useState(true);

  const shouldShowHelper = show && showHelperManually;

  const alert = shouldShowHelper && (
    <Alert
      severity="info"
      onClose={() => setShowHelperManually(false)}
      icon={false}
      className="z-10"
    >
      <Typography variant="caption" dir={isRtl ? 'rtl' : 'ltr'}>
        {text}
      </Typography>
    </Alert>
  );

  return children ? (
    <div
      className={clsx(
        "flex flex-col gap-4 w-full relative before:content-[''] before:absolute before:bg-[var(--overlay-bg)] before:-inset-2 before:rounded before:transition-colors",
        shouldShowHelper && classes.component,
      )}
      style={
        {
          '--overlay-bg': shouldShowHelper
            ? alpha(theme.palette.info.light, 0.05)
            : 'transparent',
        } as CSSProperties
      }
    >
      {alert}
      {children}
    </div>
  ) : (
    alert
  );
};
