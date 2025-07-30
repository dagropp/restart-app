import Dialog from '@common/Dialog';
import { TableCellRenderer } from '@common/Table';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';
import apiService, { FlagItemResponse } from '@services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { LIST_QUERY_KEY } from '../constants';

export const DeleteCell = ({ row }: TableCellRenderer<FlagItemResponse>) => {
  const queryClient = useQueryClient();
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  const editStatusApi = useMutation({
    mutationFn: () => apiService.flags.delete(row.id),
    onMutate: closeDialog,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [LIST_QUERY_KEY] }),
  });

  return (
    <>
      <IconButton onClick={openDialog}>
        <DeleteRoundedIcon fontSize="small" />
      </IconButton>
      <Dialog
        onClose={closeDialog}
        open={showDialog}
        success={{ onAction: editStatusApi.mutate }}
        cancel={{ onAction: closeDialog }}
      >
        Are you sure you want to delete this flag?
      </Dialog>
    </>
  );
};
