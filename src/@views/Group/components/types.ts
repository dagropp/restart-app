import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { City, Country } from '@root/types';
import { ReactNode } from 'react';

export interface ListItem {
  key: string | number;
  label: string;
  value: ReactNode;
  Icon: OverridableComponent<SvgIconTypeMap>;
  tooltip?: string;
  hidden?: boolean;
}

export interface ListItemsGroup {
  key: string | number;
  items: ListItem[];
}

export interface FavoriteItem {
  id: City | Country;
  name: string;
  country?: Country;
  isCity: boolean;
  isBookmark: boolean;
  isDestination: boolean;
}
