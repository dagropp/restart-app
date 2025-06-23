import { City } from '@root/types';

export interface CompareProps {
  storageKey: string;
  defaultCity?: City;
  defaultOther?: City;
  loading?: boolean;
  readOnly?: boolean;
}
