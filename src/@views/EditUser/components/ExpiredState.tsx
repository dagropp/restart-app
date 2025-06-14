import Button from '@common/Button';
import Toast from '@common/Toast';
import Typography from '@common/Typography';
import HeartBrokenRoundedIcon from '@mui/icons-material/HeartBrokenRounded';
import apiService from '@services/api';
import { useMutation, UseQueryResult } from '@tanstack/react-query';
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

  return (
    <div className="flex flex-col gap-2 w-full items-center text-center">
      <Typography variant="h6">Your sign-up link has expired</Typography>
      <Typography variant="body2" className="text-balance">
        The link you used is no longer valid because it expired after 1 hour.
        Please request a new sign-up link to continue.
      </Typography>
      <HeartBrokenRoundedIcon fontSize="large" className="mt-10 mb-5" />
      <Button onClick={handleResendInvite}>Refresh token</Button>
      <Button link="/">Login</Button>
      <Typography variant="caption" className="text-balance">
        If you continue to experience issues, please contact our support team.
      </Typography>
      <Toast open={isRefreshSuccess} onClose={closeToast} severity="success">
        <Typography variant="body2">
          Your sign-up token has been refreshed.
        </Typography>
        <Typography variant="caption">
          You can now use the same email link to complete your sign-up. It will
          remain valid for another hour.
        </Typography>
      </Toast>
      <Toast open={isRefreshError} onClose={closeToast} severity="error">
        <Typography variant="body2">
          We couldn’t refresh your sign-up token.
        </Typography>
        <Typography variant="caption">
          This may be due to an expired request or a system issue. Please
          contact support.
        </Typography>
      </Toast>
    </div>
  );
};

export default ExpiredState;
