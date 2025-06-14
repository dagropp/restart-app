import { type UserResponse } from '@services/api';
import { type ReactNode } from 'react';

export interface SettingsTabData {
  label?: string;
  element: ReactNode;
  shouldHide?: (user: UserResponse) => boolean;
}
