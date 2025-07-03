import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import { Language } from '@root/types';
import { interpolateTranslations, useTranslations } from '@translations';
import { useMemo } from 'react';

interface Props {
  languages: Language[];
  englishSpeakersPercentage?: number;
  captionAsTooltip?: boolean;
  englishLabelOnly?: boolean;
}

export const languageMap: Record<Language, string> = {
  [Language.AR]: 'العربية',
  [Language.CS]: 'Čeština',
  [Language.DA]: 'Dansk',
  [Language.DE]: 'Deutsche',
  [Language.EL]: 'Ελληνικά',
  [Language.EN]: 'English',
  [Language.ES]: 'Español',
  [Language.FI]: 'Suomen',
  [Language.FR]: 'Français',
  [Language.HE]: 'עברית',
  [Language.HI]: 'हिन्दी',
  [Language.HU]: 'Magyar',
  [Language.NL]: 'Nederlands',
  [Language.NO]: 'Norsk',
  [Language.PL]: 'Polski',
  [Language.PT]: 'Português',
  [Language.SL]: 'Slovenčina',
  [Language.SV]: 'Svenska',
  [Language.IT]: 'Italiano',
  [Language.ET]: 'Eesti',
  [Language.LT]: 'Lietuvių',
  [Language.TR]: 'Türkçe',
  [Language.IS]: 'Íslenska',
  [Language.LV]: 'Latviešu',
};

const LanguageDisplay = ({
  languages,
  englishSpeakersPercentage,
  captionAsTooltip,
  englishLabelOnly,
}: Props) => {
  const translations = useTranslations();

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
    <Tooltip title={captionAsTooltip && englishSpeakersLabel} placement="left">
      <Typography variant="body2" className="flex flex-col">
        {formattedLanguages}
        {!captionAsTooltip && englishSpeakersLabel && (
          <Typography variant="caption" color="textDisabled">
            ({englishSpeakersLabel})
          </Typography>
        )}
      </Typography>
    </Tooltip>
  );
};

export default LanguageDisplay;
