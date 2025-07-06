import Dialog from '@common/Dialog';
import apiService from '@services/api';
import { useMutation } from '@tanstack/react-query';

interface Props {
  open: boolean;
  onClose: () => void;
  id: number;
  onDeleteSuccess: () => void;
}

export const DeleteSimulationDialog = ({
  open,
  onClose,
  id,
  onDeleteSuccess,
}: Props) => {
  const handleDelete = useMutation({
    mutationKey: ['deleteSimulation', id],
    mutationFn: () => apiService.simulation.delete(id),
    onSuccess: onDeleteSuccess,
  });

  return (
    <Dialog
      onClose={onClose}
      open={open}
      success={{ onAction: handleDelete.mutate }}
      cancel={{ onAction: onClose }}
    >
      Are you sure you want to delete this simulation?
    </Dialog>
  );
};
