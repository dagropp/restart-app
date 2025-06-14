import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import { Language } from '@services/api';
import { useMemo } from 'react';

interface LanguageData {
  localLabel: string;
  englishLabel?: string;
}

interface Props {
  languages: Language[];
  englishSpeakersPercentage?: number;
  captionAsTooltip?: boolean;
  englishLabelOnly?: boolean;
}

export const languageMap: Record<Language, LanguageData> = {
  [Language.AR]: { localLabel: 'العربية', englishLabel: 'Arabic' },
  [Language.CS]: { localLabel: 'Čeština', englishLabel: 'Czech' },
  [Language.DA]: { localLabel: 'Dansk', englishLabel: 'Danish' },
  [Language.DE]: { localLabel: 'Deutsche', englishLabel: 'German' },
  [Language.EL]: { localLabel: 'Ελληνικά', englishLabel: 'Greek' },
  [Language.EN]: { localLabel: 'English' },
  [Language.ES]: { localLabel: 'Español', englishLabel: 'Spanish' },
  [Language.FI]: { localLabel: 'Suomen', englishLabel: 'Finnish' },
  [Language.FR]: { localLabel: 'Français', englishLabel: 'French' },
  [Language.HE]: { localLabel: 'עברית', englishLabel: 'Hebrew' },
  [Language.HI]: { localLabel: 'हिन्दी', englishLabel: 'Hindi' },
  [Language.HU]: { localLabel: 'Magyar', englishLabel: 'Hungarian' },
  [Language.NL]: { localLabel: 'Nederlands', englishLabel: 'Dutch' },
  [Language.NO]: { localLabel: 'Norsk', englishLabel: 'Norwegian' },
  [Language.PL]: { localLabel: 'Polski', englishLabel: 'Polish' },
  [Language.PT]: { localLabel: 'Português', englishLabel: 'Portuguese' },
  [Language.SL]: { localLabel: 'Slovenčina', englishLabel: 'Slovak' },
  [Language.SV]: { localLabel: 'Svenska', englishLabel: 'Swedish' },
  [Language.IT]: { localLabel: 'Italiano', englishLabel: 'Italian' },
  [Language.ET]: { localLabel: 'Eesti', englishLabel: 'Estonian' },
  [Language.LT]: { localLabel: 'Lietuvių', englishLabel: 'Lithuanian' },
  [Language.TR]: { localLabel: 'Türkçe', englishLabel: 'Turkish' },
  [Language.IS]: { localLabel: 'Íslenska', englishLabel: 'Icelandic' },
  [Language.LV]: { localLabel: 'Latviešu', englishLabel: 'Latvian' },
};

const LanguageDisplay = ({
  languages,
  englishSpeakersPercentage,
  captionAsTooltip,
  englishLabelOnly,
}: Props) => {
  const formattedLanguages = useMemo(
    () =>
      languages
        .map((language) => {
          const { localLabel, englishLabel } = languageMap[language];
          return englishLabelOnly
            ? englishLabel || localLabel
            : `${localLabel}${englishLabel ? ` (${englishLabel})` : ''}`;
        })
        .join(', '),
    [englishLabelOnly, languages],
  );

  const englishSpeakersLabel =
    englishSpeakersPercentage &&
    `${Math.round(englishSpeakersPercentage * 100)}% English speakers`;

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
