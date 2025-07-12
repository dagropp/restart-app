import Dialog from '@common/Dialog';
import apiService from '@services/api';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from '@translations';

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
  const translations = useTranslations().city.cost.simulation.savedSimulations;

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
      {translations.deleteDialog}
    </Dialog>
  );
};
