import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import { Language } from '@root/types';
import {
  interpolateTranslations,
  useTranslations,
  useTranslationsContext,
} from '@translations';
import { useMemo } from 'react';

import { languageMap } from './constants';

interface Props {
  languages: Language[];
  englishSpeakersPercentage?: number;
  captionAsTooltip?: boolean;
  englishLabelOnly?: boolean;
}

const LanguageDisplay = ({
  languages,
  englishSpeakersPercentage,
  captionAsTooltip,
  englishLabelOnly,
}: Props) => {
  const translations = useTranslations();
  const { isRtl } = useTranslationsContext();

  const formattedLanguages = useMemo(
    () =>
      languages
        .map((language) => {
          const localLabel = languageMap[language];
          const englishLabel = translations.enum.language[language];

          return englishLabelOnly
            ? englishLabel || localLabel
            : `${localLabel}${englishLabel !== localLabel ? ` (${englishLabel})` : ''}`;
        })
        .join(', '),
    [englishLabelOnly, languages, translations.enum.language],
  );

  const englishSpeakersLabel =
    englishSpeakersPercentage &&
    interpolateTranslations(translations.shared.englishSpeakers, {
      speakers: Math.round(englishSpeakersPercentage * 100),
    });

  return (
    <Tooltip
      title={captionAsTooltip && englishSpeakersLabel}
      dir={isRtl ? 'rtl' : 'ltr'}
      placement="left"
    >
      <Typography variant="body2" className="flex flex-col">
        {formattedLanguages}
        {!captionAsTooltip && englishSpeakersLabel && (
          <Typography
            variant="caption"
            color="textDisabled"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            ({englishSpeakersLabel})
          </Typography>
        )}
      </Typography>
    </Tooltip>
  );
};

export default LanguageDisplay;
