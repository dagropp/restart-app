import Button from '@common/Button';
import Toast from '@common/Toast';
import Typography from '@common/Typography';
import HeartBrokenRoundedIcon from '@mui/icons-material/HeartBrokenRounded';
import apiService from '@services/api';
import { useMutation, UseQueryResult } from '@tanstack/react-query';
import { useTranslations, useTranslationsContext } from '@translations';
import { useState } from 'react';

interface Props {
  refetch: UseQueryResult['refetch'];
}

enum RefreshStatus {
  Default = 'Default',
  Success = 'Success',
  Error = 'Error',
}

const ExpiredState = ({ refetch }: Props) => {
  const translations = useTranslations();
  const { isRtl } = useTranslationsContext();

  const compTranslations = translations.settings.signUp.stateExpired;

  const [refreshStatus, setRefreshStatus] = useState(RefreshStatus.Default);

  const resendInvite = useMutation({
    mutationFn: () => apiService.refreshToken(),
  });

  const handleResendInvite = async () => {
    const { status } = await resendInvite.mutateAsync();
    setRefreshStatus(status ? RefreshStatus.Success : RefreshStatus.Error);
    await refetch();
  };

  const isRefreshSuccess = refreshStatus === RefreshStatus.Success;
  const isRefreshError = refreshStatus === RefreshStatus.Error;

  const closeToast = () => setRefreshStatus(RefreshStatus.Default);

  const dir = isRtl ? 'rtl' : 'ltr';

  return (
    <div className="flex flex-col gap-2 w-full items-center text-center">
      <Typography variant="h6">{compTranslations.title}</Typography>
      <Typography variant="body2" className="text-balance" dir={dir}>
        {compTranslations.description}
      </Typography>
      <HeartBrokenRoundedIcon fontSize="large" className="mt-10 mb-5" />
      <Button onClick={handleResendInvite}>{compTranslations.refresh}</Button>
      <Button link="/">{translations.user.login.action}</Button>
      <Typography variant="caption" className="text-balance" dir={dir}>
        {compTranslations.remediation}
      </Typography>
      <Toast open={isRefreshSuccess} onClose={closeToast} severity="success">
        <Typography variant="body2">
          {compTranslations.status.successTitle}
        </Typography>
        <Typography variant="caption" dir={dir}>
          {compTranslations.status.successDescription}
        </Typography>
      </Toast>
      <Toast open={isRefreshError} onClose={closeToast} severity="error">
        <Typography variant="body2">
          {compTranslations.status.errorTitle}
        </Typography>
        <Typography variant="caption" dir={dir}>
          {compTranslations.status.errorDescription}
        </Typography>
      </Toast>
    </div>
  );
};

export default ExpiredState;
