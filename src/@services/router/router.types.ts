import { type ReactNode } from 'react';

export interface RouteData {
  key: string;
  element: ReactNode;
  path: string;
  param?: string;
  children?: RouteData[];
}
