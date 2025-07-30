import Select, { type SelectOption } from '@common/Select';
import { type TableCellRenderer } from '@common/Table';
import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import Checkbox from '@mui/material/Checkbox';
import { UserType } from '@root/types';
import apiService, { type FlagItemResponse } from '@services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { object } from '@utils/object.utils';
import { useState } from 'react';

import { LIST_QUERY_KEY } from '../constants';

export const UsersCell = ({ row }: TableCellRenderer<FlagItemResponse>) => {
  const { data: usersList } = apiService.users.use();
  const { id, users, ...data } = row;
  const [selected, setSelected] = useState<string[]>(users);

  const queryClient = useQueryClient();

  const editUsersApi = useMutation({
    mutationFn: (update: string[]) =>
      apiService.flags.update(id, { ...data, users: update }),
    onMutate: setSelected,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [LIST_QUERY_KEY] }),
  });

  const options: SelectOption<string>[] = usersList
    ? object
        .values(usersList)
        .map(({ id, email, firstName, lastName, type }) => {
          const isAdmin = type === UserType.Admin;
          return {
            label: (
              <>
                <Checkbox checked={isAdmin || selected.includes(id)} />
                <Tooltip title={`${firstName} ${lastName}`}>
                  <Typography variant="body2">{email}</Typography>
                </Tooltip>
              </>
            ),
            disabled: isAdmin,
            value: id,
          };
        })
    : [];

  return (
    <Select
      options={options}
      multiple
      name="users"
      value={selected}
      onChange={editUsersApi.mutate}
      renderValue={({ length }) => (
        <Typography variant="body2">{length} Users</Typography>
      )}
      classes={{ root: 'w-[250px]' }}
      size="small"
    />
  );
};
