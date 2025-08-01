import Typography from '@common/Typography';
import { LanguageDataResponse } from '@services/api';
import { useTranslations, useTranslationsContext } from '@translations';
import { array } from '@utils/array.utils';

import { useCityContext } from '../../../context';

interface Props {
  data: LanguageDataResponse;
}

export const OtherLanguages = ({ data }: Props) => {
  const translations = useTranslations();
  const compTranslations = translations.city.language;
  const langTranslations = translations.enum.language;
  const { isRtl } = useTranslationsContext();
  const { item } = useCityContext();

  const mapped = data.languages
    .filter((language) => language !== item.language)
    .map((language) => langTranslations[language]);

  if (!mapped.length) return null;

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'}>
      <Typography variant="body2" fontWeight={500}>
        {compTranslations.other}
      </Typography>
      <Typography variant="body2">
        {array.joinWithLast(mapped, ', ', compTranslations.languagesSeparator)}
      </Typography>
    </div>
  );
};
