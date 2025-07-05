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
import { interpolateTranslations, useTranslations } from '@translations';
import type { FormEvent } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  isGroupInvite?: boolean;
}

export const UserInviteDialog = ({ open, onClose, isGroupInvite }: Props) => {
  const { user } = useUserContext();
  const translations = useTranslations();
  const compTranslation = translations.menu.invite;

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
        message: interpolateTranslations(compTranslation.statusPending, {
          email,
        }),
        severity: 'pending',
        autoHide: false,
      });
      form.reset();
      onClose();
      const { status } = await sendInvite.mutateAsync(String(email));
      if (status) {
        toastService.showToast({
          message: interpolateTranslations(compTranslation.statusSuccess, {
            email,
          }),
          severity: 'success',
        });
      } else {
        toastService.showToast({
          message: interpolateTranslations(compTranslation.statusFailed, {
            email,
          }),
          severity: 'error',
        });
      }
    }
  };

  return (
    <MuiDialog open={open} onClose={onClose} aria-hidden={!open}>
      <form onSubmit={handleInviteSubmit} className="w-[400px] max-w-full">
        <DialogTitle>
          {isGroupInvite
            ? compTranslation.addToGroup
            : compTranslation.inviteUser}
        </DialogTitle>
        <DialogContent>
          <TextField
            placeholder={compTranslation.enterEmail}
            fullWidth
            variant="outlined"
            type="email"
            autoFocus
            name="email"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            {translations.common.cancel}
          </Button>
          <Button
            variant="contained"
            type="submit"
            loading={sendInvite.isPending}
          >
            {compTranslation.send}
          </Button>
        </DialogActions>
      </form>
    </MuiDialog>
  );
};
