import Rating from '@common/Rating';
import Typography from '@common/Typography';
import apiService from '@services/api';
import { useTranslations } from '@translations';

import { useCityContext } from '../../../context';

export const LanguageAverageScore = () => {
  const translations = useTranslations().city.language;
  const { item } = useCityContext();

  const { data: scores } = apiService.score.use();
  const rating = scores[item.id].language;

  return (
    <div className="flex flex-col items-center justify-center">
      <Typography variant="body2" className="pb-1">
        {translations.average}
      </Typography>
      <Rating value={rating} base={10} readOnly />
      <Typography variant="h6" fontWeight={500}>
        {(rating / 2).toFixed(1)}
      </Typography>
    </div>
  );
};
