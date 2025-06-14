import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import MuiLink from '@mui/material/Link';
import clsx from 'clsx';
import { MouseEventHandler } from 'react';
import { Link as RouterLink } from 'react-router';

import { type LinkProps } from './types';

const DEFAULT_ROUTE = '/';

const Link = ({
  external,
  href,
  children,
  className,
  onClick,
  externalIconHidden,
  stopPropagation,
  ...props
}: LinkProps) => {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (stopPropagation) event.stopPropagation();
    if (onClick) {
      event.preventDefault();
      onClick?.(event);
    }
  };

  return onClick ? (
    <MuiLink
      className={clsx('cursor-pointer', className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </MuiLink>
  ) : external ? (
    <MuiLink
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className={clsx('inline-flex items-center gap-1', className)}
      onClick={handleClick}
      {...props}
    >
      {children}
      {!externalIconHidden && <LaunchRoundedIcon fontSize="inherit" />}
    </MuiLink>
  ) : (
    <MuiLink
      component={RouterLink}
      to={href ?? DEFAULT_ROUTE}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </MuiLink>
  );
};

export default Link;
