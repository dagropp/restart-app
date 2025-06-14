import { toastService } from '@common/Toast';
import { useUserContext } from '@context/user';
import apiService, { GroupPayload } from '@services/api';
import { useMutation } from '@tanstack/react-query';
import { FormEventHandler } from 'react';

import { EditGroupForm } from './components';
import { GroupInputName } from './types';
import { parseChildren } from './utils';

export const EditExistingGroup = () => {
  const { group } = useUserContext();
  const { refetch } = apiService.useGroup(group.id);

  const editGroup = useMutation({
    mutationKey: ['editGroupRequest', group?.id],
    mutationFn: (payload: GroupPayload) =>
      apiService.editGroup(group?.id, payload),
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const departureDate = formData.get(GroupInputName.DepartureDate);
    const bedrooms = Number(formData.get(GroupInputName.Bedrooms));
    const children = parseChildren(formData.getAll(GroupInputName.Children));
    const status = await editGroup.mutateAsync({
      departureDate: departureDate ? String(departureDate) : null,
      bedrooms,
      children,
    });
    if (status) {
      await refetch();
      toastService.showToast({
        message: 'Successfully edited group',
        severity: 'success',
      });
      form.reset();
    } else {
      toastService.showToast({
        message: 'Failed to edit group',
        severity: 'error',
      });
    }
  };

  if (!group) return null;

  return (
    <div className="w-[600px]">
      <EditGroupForm
        handleSubmit={handleSubmit}
        group={group}
        submitButton={{ label: 'Save', loading: editGroup.isPending }}
      />
    </div>
  );
};
