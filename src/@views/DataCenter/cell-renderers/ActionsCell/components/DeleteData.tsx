import Button from '@common/Button';
import Dialog from '@common/Dialog';
import useBooleanState from '@hooks/useBooleanState';
import apiService, { ScrapingType } from '@services/api';
import { useMutation } from '@tanstack/react-query';
import { scrapingTypeMap } from '@views/DataCenter/utils';

interface Props {
  type: ScrapingType;
  isFetching: boolean;
  disabled: boolean;
  isPending?: boolean;
}

export const DeleteData = ({
  type,
  isFetching,
  isPending,
  disabled,
}: Props) => {
  const [isDialogOpen, dialogActions] = useBooleanState();
  const { refetch } = apiService.scraping.useData();

  const deleteData = useMutation({
    mutationKey: ['deleteScrapingData', type],
    mutationFn: () => apiService.scraping.deleteData(type),
    onSuccess: () => refetch(),
  });

  const handleClick = () => dialogActions.setTrue();

  return (
    <>
      <Button
        variant="contained"
        disabled={deleteData.isPending || isFetching || isPending || disabled}
        onClick={handleClick}
        size="small"
      >
        Delete
      </Button>
      <Dialog
        onClose={dialogActions.setFalse}
        open={isDialogOpen}
        success={{ onAction: deleteData.mutateAsync }}
        cancel={{ onAction: dialogActions.setFalse }}
      >
        Are you sure you want to delete all the data associated with{' '}
        {scrapingTypeMap[type]}
      </Dialog>
    </>
  );
};
