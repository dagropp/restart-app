import { type ChecklistItem, type ChecklistResponse } from '@services/api';
import { type Dispatch, type SetStateAction } from 'react';

export interface ChecklistWithDataProps {
  data: ChecklistResponse;
  refetch: () => void;
}

export interface ChecklistItemProps {
  item: ChecklistItem;
  isDone: boolean;
  setThis: Dispatch<SetStateAction<ChecklistItem[]>>;
  setOther: Dispatch<SetStateAction<ChecklistItem[]>>;
  createInputElement: HTMLInputElement | null;
}

export interface SkeletonItemProps {
  isDone: boolean;
}
