import Dialog from '@common/Dialog';
import { TableCellRenderer } from '@common/Table';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';
import { UserType } from '@root/types';
import apiService, { CompactUserResponse } from '@services/api';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const CONFIRM_TEXT = 'Are you sure you want to delete this user?';
const GROUP_CONFIRM_TEXT = `This user is a group owner. Deleting this user will also delete its group and other users associated with it. ${CONFIRM_TEXT}`;

export const ActionsCell = ({
  row,
}: TableCellRenderer<CompactUserResponse>) => {
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  const { refetch } = apiService.users.use();

  const deleteUserApi = useMutation({
    mutationKey: ['deleteUser', row.id],
    mutationFn: () => apiService.users.delete(row.id),
    onMutate: closeDialog,
    onSuccess: async ({ status }) => {
      if (status) await refetch();
    },
  });

  if (row.type === UserType.Admin) return null;

  return (
    <div>
      <IconButton size="small" onClick={openDialog}>
        <DeleteRoundedIcon />
      </IconButton>
      <Dialog
        onClose={closeDialog}
        open={showDialog}
        success={{ onAction: deleteUserApi.mutate }}
        cancel={{ onAction: closeDialog }}
      >
        {row.type === UserType.Standard ? CONFIRM_TEXT : GROUP_CONFIRM_TEXT}
      </Dialog>
    </div>
  );
};
