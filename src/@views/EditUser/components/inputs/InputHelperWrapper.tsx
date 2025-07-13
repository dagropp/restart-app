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
  children: ReactNode;
  bottomSpacing?: boolean;
}

export const InputHelperWrapper = ({ show, text, children }: Props) => {
  const { isRtl } = useTranslationsContext();
  const theme = useTheme();

  const [showHelper, setShowHelper] = useState(!!show);

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 relative before:content-[''] before:absolute before:bg-[var(--overlay-bg)] before:-inset-2 before:rounded before:transition-colors",
        showHelper && classes.component,
      )}
      style={
        {
          '--overlay-bg': showHelper
            ? alpha(theme.palette.info.light, 0.05)
            : 'transparent',
        } as CSSProperties
      }
    >
      {showHelper && (
        <Alert
          severity="info"
          onClose={() => setShowHelper(false)}
          icon={false}
          className="z-10"
        >
          <Typography variant="caption" dir={isRtl ? 'rtl' : 'ltr'}>
            {text}
          </Typography>
        </Alert>
      )}
      {children}
    </div>
  );
};
