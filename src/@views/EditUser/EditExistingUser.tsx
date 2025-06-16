import { toastService } from '@common/Toast';
import { useUserContext } from '@context/user';
import apiService, { Currency } from '@services/api';
import titleService from '@services/title';
import { useMutation } from '@tanstack/react-query';
import { useLayoutEffect } from 'react';

import EditUserForm from './components/EditUserForm';
import { InputName, SignUpData } from './types';

export const EditExistingUser = () => {
  useLayoutEffect(() => {
    titleService.setTitle('Settings', 'Edit User');
  }, []);

  const { user, updateUser } = useUserContext();
  const { refetch: refetchCities } = apiService.useCities();

  const editUserRequest = useMutation({
    mutationKey: ['signUpRequest'],
    mutationFn: (data: SignUpData) => {
      const incomeMark = Number(data[InputName.IncomeMark]);
      const stipendValue = data[InputName.StipendValue]?.replaceAll(',', '');

      return apiService.editUser({
        avatar: data[InputName.Avatar],
        citizenship: data[InputName.Citizenship],
        firstName: data[InputName.FirstName],
        income: data[InputName.Income],
        incomeMark: incomeMark === -1 ? undefined : incomeMark,
        lastName: data[InputName.LastName],
        dateOfBirth: data[InputName.DateOfBirth],
        incomeRemote: data[InputName.IncomeRemote] ?? null,
        stipendValue: stipendValue ? Number(stipendValue) : null,
        stipendCurrency: (data[InputName.StipendCurrency] as Currency) ?? null,
      });
    },
  });

  const handleSubmit = async (data: SignUpData) => {
    toastService.showToast({
      message: 'Editing user',
      severity: 'pending',
      autoHide: false,
    });
    const update = await editUserRequest.mutateAsync(data);
    if (update) {
      updateUser(update);
      await refetchCities();
      toastService.showToast({
        message: 'Successfully edited user',
        severity: 'success',
      });
    } else {
      toastService.showToast({
        message: 'Failed to edit user',
        severity: 'error',
      });
    }
  };

  return (
    <div className="w-[600px] max-w-full">
      <EditUserForm
        user={user}
        onSubmit={handleSubmit}
        submitButton={{ label: 'Save', loading: editUserRequest.isPending }}
      />
    </div>
  );
};
