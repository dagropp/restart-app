import { toastService } from '@common/Toast';
import { LoginState, useAppContext } from '@context/app';
import { CircularProgress } from '@mui/material';
import { Currency } from '@root/types';
import apiService, { TokenStatus, UserPayload } from '@services/api';
import storageService from '@services/storage';
import titleService from '@services/title';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router';

import EditUserForm from './components/EditUserForm';
import ExpiredState from './components/ExpiredState';
import InvalidState from './components/InvalidState';
import { GroupInputName, InputName, SignUpData } from './types';
import { useTokenParams } from './utils';

export const EditUser = () => {
  useLayoutEffect(() => {
    titleService.setTitle('Sign Up');
  }, []);

  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();
  const { token, email, group } = useTokenParams();

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
    mutationFn: (data: SignUpData) =>
      apiService.authentication.login({
        email,
        password: data[InputName.Password],
      }),
  });

  const handleSubmit = useCallback(
    async (data: SignUpData) => {
      toastService.showToast({
        message: 'Creating a new user',
        severity: 'pending',
        autoHide: false,
      });
      const { status } = await signUpRequest.mutateAsync(data);
      if (status) {
        toastService.showToast({
          message: 'Successfully created user',
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
          message: 'Failed to create user',
          severity: 'error',
        });
      }
    },
    [loginRequest, navigate, refetchCities, setIsLoggedIn, signUpRequest],
  );

  const status = data?.status;

  return (
    <div className="w-[500px] flex flex-col justify-center items-center mx-auto pt-5 max-w-full">
      {status === TokenStatus.Valid ? (
        <EditUserForm
          email={email}
          onSubmit={handleSubmit}
          submitButton={{
            label: 'Sign Up',
            loading: signUpRequest.isPending || loginRequest.isPending,
          }}
          title="Welcome aboard!"
          subtitle="Enter your user's details"
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
