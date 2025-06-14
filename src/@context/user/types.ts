import { type GroupResponse, type UserResponse } from '@services/api';

export interface IUserContext {
  user: UserResponse;
  isAdmin: boolean;
  isGroupOwner: boolean;
  group: GroupResponse;
  canSendGroupInvite: boolean;
  updateUser: (value: Partial<UserResponse>) => void;
}
