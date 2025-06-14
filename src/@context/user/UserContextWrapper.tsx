import apiService, {
  type GroupResponse,
  type UserResponse,
  UserType,
} from '@services/api';
import storageService from '@services/storage';
import { type ReactNode, useCallback, useState } from 'react';

import { IUserContext } from './types';
import { UserContext } from './UserContext';

interface Props {
  children: ReactNode;
}

const defaultGroup: GroupResponse = {
  id: '',
  children: [],
  departureDate: '',
  bedrooms: 1,
  bookmarks: [],
};

export const UserContextWrapper = ({ children }: Props) => {
  const [user, setUser] = useState(() => storageService.get('user'));

  const { data: group = defaultGroup } = apiService.useGroup(user.groupId);

  const isAdmin = user.type === UserType.Admin;
  const isGroupOwner = isAdmin || user.type === UserType.GroupOwner;

  const updateUser = useCallback(
    (value: Partial<UserResponse>) =>
      setUser((prev) => {
        const update = { ...prev, ...value };
        storageService.set('user', update);
        return update;
      }),
    [],
  );

  const ctxValue: IUserContext = {
    user,
    isAdmin,
    isGroupOwner,
    canSendGroupInvite: isGroupOwner && !group?.partner,
    group,
    updateUser,
  };

  return <UserContext value={ctxValue}>{children}</UserContext>;
};
