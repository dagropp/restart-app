import { toastService } from '@common/Toast';
import { useUserContext } from '@context/user';
import { City, Country } from '@root/types';
import apiService, { GroupPayload } from '@services/api';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from '@translations';
import { FormEventHandler } from 'react';

import { EditGroupForm } from './components';
import { GroupInputName } from './types';
import { parseChildren } from './utils';

export const EditExistingGroup = () => {
  const { group } = useUserContext();
  const { refetch } = apiService.useGroup(group.id);
  const { refetch: refetchCities } = apiService.useCities();
  const { refetch: refetchCountries } = apiService.countries.useList();
  const translations = useTranslations();
  const compTranslations = translations.settings.editGroup;

  const editGroup = useMutation({
    mutationKey: ['editGroupRequest', group?.id],
    mutationFn: (payload: GroupPayload) =>
      apiService.editGroup(group?.id, payload),
    onSuccess: async () => {
      await refetchCities();
      await refetchCountries();
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    toastService.showToast({
      message: compTranslations.pending,
      severity: 'pending',
    });
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const departureDate = formData.get(GroupInputName.DepartureDate);
    const bedrooms = Number(formData.get(GroupInputName.Bedrooms));
    const children = parseChildren(formData.getAll(GroupInputName.Children));
    const destination = formData.get(GroupInputName.Destination) as
      | City
      | Country;
    const status = await editGroup.mutateAsync({
      departureDate: departureDate ? String(departureDate) : null,
      bedrooms,
      children,
      destination,
    });
    if (status) {
      await refetch();
      toastService.showToast({
        message: compTranslations.success,
        severity: 'success',
      });
      form.reset();
    } else {
      toastService.showToast({
        message: compTranslations.error,
        severity: 'error',
      });
    }
  };

  if (!group) return null;

  return (
    <div className="w-[600px] max-w-full">
      <EditGroupForm
        handleSubmit={handleSubmit}
        group={group}
        submitButton={{
          label: translations.common.save,
          loading: editGroup.isPending,
        }}
      />
    </div>
  );
};
