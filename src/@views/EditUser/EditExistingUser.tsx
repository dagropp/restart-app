import { toastService } from '@common/Toast';
import { useUserContext } from '@context/user';
import { Currency } from '@root/types';
import apiService from '@services/api';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from '@translations';

import EditUserForm from './components/EditUserForm';
import { InputName, SignUpData } from './types';

export const EditExistingUser = () => {
  const { user, updateUser } = useUserContext();
  const { refetch: refetchCities } = apiService.useCities();
  const translations = useTranslations();
  const compTranslations = translations.settings.editUser;

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
      message: compTranslations.pending,
      severity: 'pending',
      autoHide: false,
    });
    const update = await editUserRequest.mutateAsync(data);
    if (update) {
      updateUser(update);
      await refetchCities();
      toastService.showToast({
        message: compTranslations.success,
        severity: 'success',
      });
    } else {
      toastService.showToast({
        message: compTranslations.error,
        severity: 'error',
      });
    }
  };

  return (
    <div className="w-[600px] max-w-full">
      <EditUserForm
        user={user}
        onSubmit={handleSubmit}
        submitButton={{
          label: translations.common.save,
          loading: editUserRequest.isPending,
        }}
      />
    </div>
  );
};
