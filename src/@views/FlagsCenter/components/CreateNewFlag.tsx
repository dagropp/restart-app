import Button from '@common/Button';
import TextField from '@common/TextField';
import apiService, { EditFlagPayload } from '@services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent } from 'react';

import { LIST_QUERY_KEY } from '../constants';

const metadata = {
  name: { label: 'Name', key: 'name' },
  description: { label: 'Description', key: 'description' },
};

export const CreateNewFlag = () => {
  const queryClient = useQueryClient();

  const editStatusApi = useMutation({
    mutationFn: (payload: EditFlagPayload) => apiService.flags.create(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [LIST_QUERY_KEY] }),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get(metadata.name.key));
    const description = String(data.get(metadata.description.key));
    editStatusApi.mutate({
      name,
      description,
      users: [],
      groups: [],
      status: false,
    });
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <TextField
        size="small"
        placeholder={metadata.name.label}
        label={metadata.name.label}
        name={metadata.name.key}
        className="w-[200px]"
        required
      />
      <TextField
        size="small"
        placeholder={metadata.description.label}
        label={metadata.description.label}
        name={metadata.description.key}
        className="w-[300px]"
      />
      <Button type="submit" variant="contained" className="h-[37px]">
        Create
      </Button>
    </form>
  );
};
