import { SettingsTabKey } from '@root/types';
import { lazy } from 'react';

interface Props {
  tab: SettingsTabKey;
}

const SettingsComponent = lazy(() => import('./SettingsComponent'));

const Settings = ({ tab }: Props) => <SettingsComponent tab={tab} />;

export default Settings;
