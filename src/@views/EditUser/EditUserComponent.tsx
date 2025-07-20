import { toastService } from '@common/Toast';
import { CircularProgress } from '@mui/material';
import { Currency } from '@root/types';
import apiService, { TokenStatus, UserPayload } from '@services/api';
import storageService from '@services/storage';
import titleService from '@services/title';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslations } from '@translations';
import { SuccessDialog } from '@views/EditUser/components';
import { useCallback, useLayoutEffect, useState } from 'react';

import EditUserForm from './components/EditUserForm';
import ExpiredState from './components/ExpiredState';
import InvalidState from './components/InvalidState';
import { CreateNewUser } from './CreateNewUser';
import {
  GroupInputName,
  InputName,
  PartnerInputName,
  SignUpData,
} from './types';
import { useTokenParams } from './utils';

const EditUserComponent = () => {
  const { token, email, group, userId } = useTokenParams();
  const translations = useTranslations().settings.signUp;
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useLayoutEffect(() => {
    titleService.setTitle(translations.signUp);
  }, [translations.signUp]);

  const { data, refetch } = useQuery({
    queryKey: ['validateToken'],
    queryFn: () => apiService.validateToken(email, token),
    enabled: !!email && !!token,
  });

  const { data: anonymousUser, isLoading: isAnonymousUserLoading } = useQuery({
    queryKey: ['getExistingUser', userId],
    queryFn: () => apiService.users.get(userId!),
    enabled: !!userId,
  });
  console.log(anonymousUser);
  const signUpRequest = useMutation({
    mutationKey: ['signUpRequest', email, token, group],
    mutationFn: (data: SignUpData) => {
      const incomeMark = Number(data[InputName.IncomeMark]);
      const stipendValue = data[InputName.StipendValue]
        ? Number(data[InputName.StipendValue].replace(/[^0-9.]/g, ''))
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
          destination: data[GroupInputName.Destination],
        };
      }
      if (data[PartnerInputName.FirstName] && data[PartnerInputName.LastName]) {
        const partnerIncomeMark = Number(data[PartnerInputName.IncomeMark]);
        const partnerStipendValue = data[PartnerInputName.StipendValue]
          ? Number(data[PartnerInputName.StipendValue].replace(/[^0-9.]/g, ''))
          : null;
        const partnerStipendCurrency = data[PartnerInputName.StipendCurrency]
          ? (data[PartnerInputName.StipendCurrency] as Currency)
          : null;

        payload.partnerPayload = {
          avatar: data[PartnerInputName.Avatar],
          citizenship: data[PartnerInputName.Citizenship],
          firstName: data[PartnerInputName.FirstName],
          income: data[PartnerInputName.Income],
          incomeMark: partnerIncomeMark === -1 ? undefined : partnerIncomeMark,
          incomeRemote: data[PartnerInputName.IncomeRemote] ?? null,
          lastName: data[PartnerInputName.LastName],
          password: data[PartnerInputName.Password],
          dateOfBirth: data[PartnerInputName.DateOfBirth],
          groupId: group,
          stipendValue: partnerStipendValue,
          stipendCurrency: partnerStipendCurrency,
          email: data[PartnerInputName.Email],
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
          autoHide: true,
        });
        const user = await loginRequest.mutateAsync(data);
        if (user) {
          storageService.set('user', user);
          setShowSuccessDialog(true);
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
        group ? (
          userId && isAnonymousUserLoading ? (
            <CircularProgress />
          ) : (
            <EditUserForm
              email={email}
              onSubmit={handleSubmit}
              submitButton={{
                label: translations.signUp,
                loading: signUpRequest.isPending || loginRequest.isPending,
              }}
              title={translations.welcome}
              subtitle={translations.description}
              user={anonymousUser}
              isSignUp
            />
          )
        ) : (
          <CreateNewUser email={email} onSubmit={handleSubmit} />
        )
      ) : status === TokenStatus.Expired ? (
        <ExpiredState refetch={refetch} />
      ) : status === TokenStatus.Invalid ? (
        <InvalidState />
      ) : (
        <CircularProgress />
      )}
      <SuccessDialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
      />
    </div>
  );
};

export default EditUserComponent;
