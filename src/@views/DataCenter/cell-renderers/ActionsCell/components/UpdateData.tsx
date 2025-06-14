import Button from '@common/Button';
import Typography from '@common/Typography';
import usePrevValue from '@hooks/usePrevValue.ts';
import { CircularProgress } from '@mui/material';
import apiService, {
  ScrapingStatusResponse,
  ScrapingType,
} from '@services/api';
import { useMutation } from '@tanstack/react-query';

interface Props {
  type: ScrapingType;
  status?: ScrapingStatusResponse;
  isFetching: boolean;
  setIsFetching: (isFetching: boolean) => void;
  refetchData: () => void;
  refetchStatuses: () => void;
}

const shortScraping = [ScrapingType.Currencies];

export const UpdateData = ({
  type,
  isFetching,
  setIsFetching,
  refetchData,
  refetchStatuses,
  status,
}: Props) => {
  const isShort = shortScraping.includes(type);

  const update = useMutation({
    mutationKey: ['updateScraping'],
    mutationFn: () => apiService.scraping.put(type),
    onMutate: async () => {
      setIsFetching(true);
      if (isShort)
        setTimeout(async () => {
          setIsFetching(false);
          refetchData();
        }, 1000);
      refetchStatuses();
    },
  });

  const handleClick = () => update.mutateAsync();

  usePrevValue(status?.isPending, async (prev, next) => {
    if (prev && !next) {
      setIsFetching(false);
      refetchData();
      refetchStatuses();
    }
  });

  const progress = status?.isPending ? Math.round(status.progress * 100) : 0;

  return (
    <div>
      {status?.isPending || isFetching ? (
        <div className="relative w-[28px] h-[28px]">
          <CircularProgress variant="determinate" value={progress} size={28} />
          <Typography
            variant="caption"
            className="absolute inset-0 flex items-center justify-center scale-[0.85]"
          >
            {progress}%
          </Typography>
        </div>
      ) : (
        <Button
          variant="contained"
          disabled={update.isPending}
          onClick={handleClick}
          size="small"
        >
          Update
        </Button>
      )}
    </div>
  );
};
