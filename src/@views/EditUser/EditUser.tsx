import { toastService } from '@common/Toast';
import { LoginState, useAppContext } from '@context/app';
import { CircularProgress } from '@mui/material';
import { Currency } from '@root/types';
import apiService, { TokenStatus, UserPayload } from '@services/api';
import storageService from '@services/storage';
import titleService from '@services/title';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslations } from '@translations';
import { useCallback, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router';

import EditUserForm from './components/EditUserForm';
import ExpiredState from './components/ExpiredState';
import InvalidState from './components/InvalidState';
import { GroupInputName, InputName, SignUpData } from './types';
import { useTokenParams } from './utils';

export const EditUser = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();
  const { token, email, group } = useTokenParams();
  const translations = useTranslations().settings.signUp;

  useLayoutEffect(() => {
    titleService.setTitle(translations.signUp);
  }, [translations.signUp]);

  const { data, refetch } = useQuery({
    queryKey: ['validateToken'],
    queryFn: () => apiService.validateToken(email, token),
    enabled: !!email && !!token,
  });

  const { refetch: refetchCities } = apiService.useCities();

  const signUpRequest = useMutation({
    mutationKey: ['signUpRequest', email, token, group],
    mutationFn: (data: SignUpData) => {
      const incomeMark = Number(data[InputName.IncomeMark]);
      const stipendValue = data[InputName.StipendValue]
        ? Number(data[InputName.StipendValue])
        : null;
      const stipendCurrency = data[InputName.StipendCurrency]
        ? (data[InputName.StipendCurrency] as Currency)
        : null;

      const payload: UserPayload = {
        avatar: data[InputName.Avatar],
        citizenship: data[InputName.Citizenship],
        firstName: data[InputName.FirstName],
        income: data[InputName.Income],
        incomeMark: incomeMark === -1 ? undefined : incomeMark,
        incomeRemote: data[InputName.IncomeRemote] ?? null,
        lastName: data[InputName.LastName],
        password: data[InputName.Password],
        dateOfBirth: data[InputName.DateOfBirth],
        groupId: group,
        stipendValue,
        stipendCurrency,
        email,
      };
      if (
        !group &&
        data[GroupInputName.DepartureDate] &&
        data[GroupInputName.Bedrooms]
      ) {
        payload.groupPayload = {
          departureDate: data[GroupInputName.DepartureDate],
          bedrooms: Number(data[GroupInputName.Bedrooms]),
          children: data[GroupInputName.Children] ?? [],
        };
      }
      return apiService.signUp(payload);
    },
  });

  const loginRequest = useMutation({
    mutationKey: ['loginRequest', email],
    mutationFn: (data: SignUpData) =>
      apiService.authentication.login({
        email,
        password: data[InputName.Password],
      }),
  });

  const handleSubmit = useCallback(
    async (data: SignUpData) => {
      toastService.showToast({
        message: translations.status.pending,
        severity: 'pending',
        autoHide: false,
      });
      const { status } = await signUpRequest.mutateAsync(data);
      if (status) {
        toastService.showToast({
          message: translations.status.success,
          severity: 'success',
        });
        const user = await loginRequest.mutateAsync(data);
        if (user) {
          storageService.set('user', user);
          setIsLoggedIn(LoginState.Valid);
          navigate('/');
          await refetchCities();
        }
      } else {
        toastService.showToast({
          message: translations.status.error,
          severity: 'error',
        });
      }
    },
    [
      loginRequest,
      navigate,
      refetchCities,
      setIsLoggedIn,
      signUpRequest,
      translations.status.error,
      translations.status.pending,
      translations.status.success,
    ],
  );

  const status = data?.status;

  return (
    <div className="w-[600px] flex flex-col justify-center items-center mx-auto p-5 max-w-full">
      {status === TokenStatus.Valid ? (
        <EditUserForm
          email={email}
          onSubmit={handleSubmit}
          submitButton={{
            label: translations.signUp,
            loading: signUpRequest.isPending || loginRequest.isPending,
          }}
          title={translations.welcome}
          subtitle={translations.description}
          createNewGroup={!group}
        />
      ) : status === TokenStatus.Expired ? (
        <ExpiredState refetch={refetch} />
      ) : status === TokenStatus.Invalid ? (
        <InvalidState />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};
