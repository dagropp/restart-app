import { StatusResponse, UserResponse, UsersList } from '@services/api';
import { getUrl } from '@services/api/utils';
import { http } from '@services/http.service';
import { useQuery } from '@tanstack/react-query';

const ROOT = 'users';

const getUsers = (): Promise<UsersList> => http.get<UsersList>(getUrl(ROOT));

const use = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    staleTime: Infinity,
  });

const get = (id: string): Promise<UserResponse> => http.get(getUrl(ROOT, id));

const deleteUser = (id: string): Promise<StatusResponse> =>
  http.delete(getUrl(ROOT, id));

export const users = { use, delete: deleteUser, get };
