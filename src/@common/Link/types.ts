import { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { type MouseEvent } from 'react';

export interface LinkProps extends Omit<MuiLinkProps, 'component'> {
  external?: boolean;
  externalIconHidden?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  stopPropagation?: boolean;
}
