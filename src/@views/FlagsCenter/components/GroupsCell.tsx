import Select, { type SelectOption } from '@common/Select';
import { type TableCellRenderer } from '@common/Table';
import Typography from '@common/Typography';
import Checkbox from '@mui/material/Checkbox';
import { UserType } from '@root/types';
import apiService, {
  type CompactUserResponse,
  type FlagItemResponse,
} from '@services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { object } from '@utils/object.utils';
import { useMemo, useState } from 'react';

import { LIST_QUERY_KEY } from '../constants';

export const GroupsCell = ({ row }: TableCellRenderer<FlagItemResponse>) => {
  const { data: usersList } = apiService.users.use();
  const { id, groups, ...data } = row;
  const [selected, setSelected] = useState<string[]>(groups);

  const queryClient = useQueryClient();

  const editUsersApi = useMutation({
    mutationFn: (update: string[]) =>
      apiService.flags.update(id, { ...data, groups: update }),
    onMutate: setSelected,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [LIST_QUERY_KEY] }),
  });

  const options: SelectOption<string>[] = useMemo(() => {
    if (!usersList) return [];

    const groups = Object.groupBy(
      object.values(usersList),
      (item) => item.groupId,
    ) as Record<string, CompactUserResponse[]>;

    return object.values(groups).map((group) => {
      const { groupId, firstName, lastName } =
        group.find(({ type }) =>
          [UserType.Admin, UserType.GroupOwner].includes(type),
        ) ?? group[0];
      return {
        label: (
          <>
            <Checkbox checked={selected.includes(groupId)} />
            <Typography variant="body2">
              {firstName} {lastName}'s Group
            </Typography>
          </>
        ),
        value: groupId,
      };
    });
  }, [selected, usersList]);

  return (
    <Select
      options={options}
      multiple
      name="users"
      value={selected}
      onChange={editUsersApi.mutate}
      renderValue={({ length }) => (
        <Typography variant="body2">{length} Groups</Typography>
      )}
      classes={{ root: 'w-[250px]' }}
      size="small"
    />
  );
};
