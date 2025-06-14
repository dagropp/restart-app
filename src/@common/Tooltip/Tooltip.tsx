import MuiTooltip from '@mui/material/Tooltip';
import clsx from 'clsx';

import Typography from '../Typography';
import styles from './styles.module.css';
import { type TooltipProps } from './types';

const Tooltip = ({
  title = '',
  arrow = true,
  classes = {},
  children,
  ...props
}: TooltipProps) => {
  const isComponent = title && typeof title !== 'string';

  const popper = isComponent ? (
    <div className="rounded-[inherit] overflow-hidden">{title}</div>
  ) : (
    <Typography variant="body2" component="span">
      {title}
    </Typography>
  );

  return (
    <MuiTooltip
      title={title ? popper : ''}
      arrow={arrow}
      classes={{
        ...classes,
        popper: clsx(isComponent && styles.hasComponent, classes?.popper),
      }}
      {...props}
    >
      {children}
    </MuiTooltip>
  );
};

export default Tooltip;
