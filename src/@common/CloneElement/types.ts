import { type ReactNode } from 'react';

export interface CloneElementProps {
  times?: number | false;
  children: ReactNode;
}
