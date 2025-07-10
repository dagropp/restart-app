import SentimentDissatisfiedRoundedIcon from '@mui/icons-material/SentimentDissatisfiedRounded';
import SentimentNeutralRoundedIcon from '@mui/icons-material/SentimentNeutralRounded';
import SentimentSatisfiedAltRoundedIcon from '@mui/icons-material/SentimentSatisfiedAltRounded';
import { alpha, Theme } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { InsightType, ValidInsightType } from '@services/api';
import { ITranslations } from '@translations';

interface IconTypeData {
  Icon: OverridableComponent<SvgIconTypeMap>;
  bgcolor: (theme: Theme) => string;
  label: string;
}

const itemTypeMap: Record<ValidInsightType, Omit<IconTypeData, 'label'>> = {
  [InsightType.Good]: {
    Icon: SentimentSatisfiedAltRoundedIcon,
    bgcolor: (theme) => alpha(theme.palette.success.light, 0.4),
  },
  [InsightType.Bad]: {
    Icon: SentimentDissatisfiedRoundedIcon,
    bgcolor: (theme) => alpha(theme.palette.error.light, 0.4),
  },
  [InsightType.Neutral]: {
    Icon: SentimentNeutralRoundedIcon,
    bgcolor: (theme) => alpha(theme.palette.success.contrastText, 0.2),
  },
};

export const getItemTypeData = (
  type: ValidInsightType,
  translations: ITranslations,
): IconTypeData => {
  const label = translations.enum.insights[type];
  return { ...itemTypeMap[type], label };
};
