import { InsightKey } from '@services/api';

export enum ItemType {
  Hidden,
  Good,
  Neutral,
  Bad,
}

export type ValidItemType = Exclude<ItemType, ItemType.Hidden>;

export interface ItemProps {
  insightKey: InsightKey;
  label: string;
  link?: string;
}

export interface ItemData extends ItemProps {
  type: ItemType;
  key: string;
  hidden?: boolean;
}
