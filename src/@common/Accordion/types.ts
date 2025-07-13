import { type OverridableComponent } from '@mui/material/OverridableComponent';
import { type SvgIconTypeMap } from '@mui/material/SvgIcon';
import { type ReactNode } from 'react';

export interface AccordionProps {
  expanded: boolean;
  handleExpand: () => void;
  title: ReactNode;
  Icon?: OverridableComponent<SvgIconTypeMap>;
  children: ReactNode;
}
