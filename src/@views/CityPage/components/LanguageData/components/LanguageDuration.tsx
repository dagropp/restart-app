import Typography from '@common/Typography';
import { LanguageDataResponse } from '@services/api';
import { useTranslations, useTranslationsContext } from '@translations';

import { DurationBadge } from './DurationBadge';

interface Props {
  data: LanguageDataResponse;
}

export const LanguageDuration = ({ data }: Props) => {
  const translations = useTranslations().city.language;
  const { isRtl } = useTranslationsContext();

  return (
    <div>
      <Typography variant="body2" fontWeight={500} dir={isRtl ? 'rtl' : 'ltr'}>
        {translations.duration}
      </Typography>
      <div className="flex items-center justify-center mt-4">
        <DurationBadge
          duration={data.numberOfWeeks}
          label={translations.weeks}
        />
        <DurationBadge
          duration={data.numberOfHours}
          label={translations.hours}
          isLast
        />
      </div>
    </div>
  );
};
