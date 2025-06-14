import SentimentDissatisfiedRoundedIcon from '@mui/icons-material/SentimentDissatisfiedRounded';
import SentimentNeutralRoundedIcon from '@mui/icons-material/SentimentNeutralRounded';
import SentimentSatisfiedAltRoundedIcon from '@mui/icons-material/SentimentSatisfiedAltRounded';
import { alpha, Theme } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { InsightType, ValidInsightType } from '@services/api';

interface IconTypeData {
  Icon: OverridableComponent<SvgIconTypeMap>;
  bgcolor: (theme: Theme) => string;
  label: string;
}

export const itemTypeMap: Record<ValidInsightType, IconTypeData> = {
  [InsightType.Good]: {
    Icon: SentimentSatisfiedAltRoundedIcon,
    bgcolor: (theme) => alpha(theme.palette.success.light, 0.4),
    label: 'The Good',
  },
  [InsightType.Bad]: {
    Icon: SentimentDissatisfiedRoundedIcon,
    bgcolor: (theme) => alpha(theme.palette.error.light, 0.4),
    label: 'The Bad',
  },
  [InsightType.Neutral]: {
    Icon: SentimentNeutralRoundedIcon,
    bgcolor: (theme) => alpha(theme.palette.success.contrastText, 0.2),
    label: 'The So-So',
  },
};
