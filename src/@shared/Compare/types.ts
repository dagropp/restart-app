import { City } from '@services/api';

export interface CompareProps {
  storageKey: string;
  defaultCity?: City;
  defaultOther?: City;
  loading?: boolean;
  readOnly?: boolean;
}
