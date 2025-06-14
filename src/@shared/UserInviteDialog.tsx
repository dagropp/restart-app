import { toastService } from '@common/Toast';
import { useUserContext } from '@context/user';
import Button from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import apiService from '@services/api';
import { useMutation } from '@tanstack/react-query';
import type { FormEvent } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  isGroupInvite?: boolean;
}

export const UserInviteDialog = ({ open, onClose, isGroupInvite }: Props) => {
  const { user } = useUserContext();

  const sendInvite = useMutation({
    mutationKey: ['sendInvite', isGroupInvite, user.groupId],
    mutationFn: (email: string) =>
      apiService.sendInvite(email, isGroupInvite ? user.groupId : undefined),
  });

  const handleInviteSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const isValid = form.checkValidity();
    const { email } = Object.fromEntries(new FormData(form));
    if (isValid && email) {
      toastService.showToast({
        message: `Sending invitation email to ${email}`,
        severity: 'pending',
        autoHide: false,
      });
      form.reset();
      onClose();
      const { status } = await sendInvite.mutateAsync(String(email));
      if (status) {
        toastService.showToast({
          message: `Successfully sent email to ${email}`,
          severity: 'success',
        });
      } else {
        toastService.showToast({
          message: `Couldn't send email to ${email}`,
          severity: 'error',
        });
      }
    }
  };

  return (
    <MuiDialog open={open} onClose={onClose} aria-hidden={!open}>
      <form onSubmit={handleInviteSubmit} className="w-[400px] max-w-full">
        <DialogTitle>
          {isGroupInvite ? 'Add User to Group' : 'Invite User'}
        </DialogTitle>
        <DialogContent>
          <TextField
            placeholder="Enter email..."
            fullWidth
            variant="outlined"
            type="email"
            autoFocus
            name="email"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            loading={sendInvite.isPending}
          >
            Send
          </Button>
        </DialogActions>
      </form>
    </MuiDialog>
  );
};
