import { useUserContext } from '@context/user';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import { SettingsTabKey, UserType } from '@root/types';
import { UserResponse } from '@services/api';
import titleService from '@services/title';
import { useTranslations } from '@translations';
import { object } from '@utils/object.utils';
import FlagsCenter from '@views/FlagsCenter';
import { useLayoutEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router';

import DataCenter from '../DataCenter';
import DataCenterItem from '../DataCenterItem';
import { EditExistingGroup, EditExistingUser } from '../EditUser';
import UsersCenter from '../UsersCenter';
import { SettingsTabData } from './types';

interface Props {
  tab: SettingsTabKey;
}

const Settings = ({ tab }: Props) => {
  const { pathname } = useLocation();
  const { user } = useUserContext();
  const translations = useTranslations().settings;
  const compTranslations = translations.tabs;

  const key: SettingsTabKey = pathname?.includes(SettingsTabKey.DATA_CENTER)
    ? SettingsTabKey.DATA_CENTER
    : (pathname?.split('/').at(-1) as SettingsTabKey);

  const getPath = (path: SettingsTabKey) => `/settings/${path}`;

  const routes: Record<SettingsTabKey, SettingsTabData> = useMemo(
    () => ({
      [SettingsTabKey.EDIT_USER]: {
        label: compTranslations.editUser,
        element: <EditExistingUser />,
      },
      [SettingsTabKey.EDIT_GROUP]: {
        label: compTranslations.editGroup,
        element: <EditExistingGroup />,
      },
      [SettingsTabKey.DATA_CENTER]: {
        label: compTranslations.dataCenter,
        element: <DataCenter />,
        shouldHide: (user: UserResponse) => user.type !== UserType.Admin,
      },
      [SettingsTabKey.DATA_CENTER_ITEM]: {
        element: <DataCenterItem />,
        shouldHide: () => true,
      },
      [SettingsTabKey.USERS]: {
        label: compTranslations.users,
        element: <UsersCenter />,
        shouldHide: (user: UserResponse) => user.type !== UserType.Admin,
      },
      [SettingsTabKey.FLAGS]: {
        label: compTranslations.flags,
        element: <FlagsCenter />,
        shouldHide: (user: UserResponse) => user.type !== UserType.Admin,
      },
    }),
    [
      compTranslations.dataCenter,
      compTranslations.editGroup,
      compTranslations.editUser,
      compTranslations.flags,
      compTranslations.users,
    ],
  );

  useLayoutEffect(() => {
    const keyTitle = key && key in routes ? routes[key].label : '';
    titleService.setTitle(translations.title, keyTitle);
  }, [key, routes, translations.title]);

  return (
    <div className="px-5">
      <MuiTabs
        value={key}
        className="sticky top-0 z-10"
        sx={{ bgcolor: (theme) => theme.palette.background.default }}
      >
        {object
          .entries(routes)
          .filter(([, { shouldHide }]) => !shouldHide?.(user))
          .map(([key, { label }]) => (
            <MuiTab
              key={key}
              value={key}
              label={label}
              component={Link}
              to={getPath(key)}
            />
          ))}
      </MuiTabs>
      <div className="pt-5">{routes[tab].element}</div>
    </div>
  );
};

export default Settings;
