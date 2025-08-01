import CloneElement from '@common/CloneElement';
import Typography from '@common/Typography';
import Skeleton from '@mui/material/Skeleton';
import { LanguageDataResponse } from '@services/api';
import { useTranslations, useTranslationsContext } from '@translations';
import { array } from '@utils/array.utils';

import { useCityContext } from '../../../context';

interface Props {
  data?: LanguageDataResponse;
  isLoading: boolean;
}

export const OtherLanguages = ({ data, isLoading }: Props) => {
  const translations = useTranslations();
  const compTranslations = translations.city.language;
  const langTranslations = translations.enum.language;
  const { isRtl } = useTranslationsContext();
  const { item } = useCityContext();

  const mapped = data?.languages
    .filter((language) => language !== item.language)
    .map((language) => langTranslations[language]);

  if (!mapped?.length && !isLoading) return null;

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'}>
      <Typography variant="body2" fontWeight={500}>
        {compTranslations.other}
      </Typography>
      <Typography variant="body2">
        {mapped?.length ? (
          array.joinWithLast(mapped, ', ', compTranslations.languagesSeparator)
        ) : (
          <CloneElement times={2}>
            <Skeleton variant="text" className="w-3/4 mx-auto" />
          </CloneElement>
        )}
      </Typography>
    </div>
  );
};
