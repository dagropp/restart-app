import Typography from '@common/Typography';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import {
  interpolateTranslations,
  useTranslations,
  useTranslationsContext,
} from '@translations';
import { number } from '@utils/number.utils';

import { useCityContext } from '../../../context';

export const EnglishSpeakers = () => {
  const translations = useTranslations().city.language;
  const { isRtl } = useTranslationsContext();
  const { item } = useCityContext();
  const { englishSpeakersPercentage } = item.country;

  if (!englishSpeakersPercentage) return null;

  return (
    <Typography
      variant="body2"
      className="flex items-center justify-center gap-1"
      mt={2}
      color="textSecondary"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <LightbulbRoundedIcon fontSize="small" />
      {interpolateTranslations(translations.englishSpeakers, {
        percentage: number.toFixed(englishSpeakersPercentage * 100),
      })}
    </Typography>
  );
};
