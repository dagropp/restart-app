import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { alpha, Theme } from '@mui/material';
import { CompareStatus } from '@services/api';

export const statusMap = {
  [CompareStatus.Winner]: {
    Icon: CheckCircleOutlineRoundedIcon,
    bgcolor: (theme: Theme) => alpha(theme.palette.success.light, 0.4),
  },
  [CompareStatus.Loser]: {
    Icon: HighlightOffRoundedIcon,

    bgcolor: (theme: Theme) => alpha(theme.palette.error.light, 0.4),
  },
  [CompareStatus.Tie]: {
    Icon: RemoveCircleOutlineRoundedIcon,
    bgcolor: (theme: Theme) => alpha(theme.palette.text.primary, 0.1),
  },
};
