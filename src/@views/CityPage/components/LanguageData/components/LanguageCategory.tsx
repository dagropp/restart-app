import Link from '@common/Link';
import Typography from '@common/Typography';
import { LanguageDataResponse } from '@services/api';
import {
  interpolateTranslations,
  useTranslations,
  useTranslationsContext,
} from '@translations';

import { useCityContext } from '../../../context';
import { DifficultyRating } from './DifficultyRating';

interface Props {
  data: LanguageDataResponse;
}

const SOURCE_LINK =
  'https://effectivelanguagelearning.com/language-guide/language-difficulty';

export const LanguageCategory = ({ data }: Props) => {
  const { item } = useCityContext();
  const translations = useTranslations();
  const { isRtl } = useTranslationsContext();
  const compTranslations = translations.city.language;
  const languageLabel = translations.enum.language[item.language];

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="flex flex-col gap-2">
      <Typography variant="body2" fontWeight={500}>
        {interpolateTranslations(compTranslations.rank, {
          language: languageLabel,
        })}{' '}
        <Link external href={SOURCE_LINK} />
      </Typography>
      <DifficultyRating category={data.category} />
      <Typography
        variant="caption"
        color="textSecondary"
        className="text-balance"
      >
        [ {data.description} ]
      </Typography>
    </div>
  );
};
