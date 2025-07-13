import ClickAwayListener from '@mui/material/ClickAwayListener';
import MuiTooltip from '@mui/material/Tooltip';
import { style } from '@utils/style.utils';
import clsx from 'clsx';
import { cloneElement, ReactElement, useEffect, useState } from 'react';

import Typography from '../Typography';
import styles from './styles.module.css';
import { type TooltipProps } from './types';

type BaseChild = ReactElement<{ onClick?: () => void }>;

const ClickTooltip = ({
  children,
  title,
  open: _open,
  ...props
}: TooltipProps) => {
  const [open, setOpen] = useState(
    _open ?? (style.isHoverSupported ? undefined : false),
  );

  const childProps: object = children.props ?? {};

  const onClose = () => setOpen(false);
  const toggle = () => setOpen((prev) => !prev);

  const clonedChildren =
    style.isHoverSupported || 'onClick' in childProps
      ? children
      : cloneElement(children as BaseChild, { onClick: toggle, ...childProps });

  useEffect(() => {
    setOpen(_open);
  }, [_open]);

  return (
    <ClickAwayListener onClickAway={onClose}>
      <MuiTooltip title={title} open={open} {...props}>
        {clonedChildren}
      </MuiTooltip>
    </ClickAwayListener>
  );
};

const HoverTooltip = ({ children, title, ...props }: TooltipProps) => (
  <MuiTooltip title={title} {...props}>
    {children}
  </MuiTooltip>
);

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
    <Typography variant="body2" component="span" dir={props.dir}>
      {title}
    </Typography>
  );

  const sharedProps = {
    title: title ? popper : '',
    arrow,
    classes: {
      ...classes,
      popper: clsx(isComponent && styles.hasComponent, classes?.popper),
    },
    children,
    ...props,
  };

  return style.isHoverSupported ? (
    <HoverTooltip {...sharedProps} />
  ) : (
    <ClickTooltip {...sharedProps} />
  );
};

export default Tooltip;
