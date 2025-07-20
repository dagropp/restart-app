import { lazy } from 'react';

const EditUserComponent = lazy(() => import('./EditUserComponent'));

export const EditUser = () => <EditUserComponent />;
