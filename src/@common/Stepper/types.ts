import { type ReactElement, type ReactNode } from 'react';

export interface Step<K> {
  key: K;
  label: ReactNode;
  element: ReactElement;
  onFinish?: (data: FormData) => void;
  optional?: boolean;
  hidden?: boolean;
}

export type StepperData<K extends string> = Partial<Record<K, FormData>>;

export interface StepperProps<K extends string> {
  steps: Step<K>[];
  onFinish: (data: StepperData<K>) => void;
  defaultStep?: number;
  className?: string;
  childrenClassName?: string;
}
