import { lazy } from 'react';

const GroupComponent = lazy(() => import('./GroupComponent'));

const Group = () => <GroupComponent />;

export default Group;
