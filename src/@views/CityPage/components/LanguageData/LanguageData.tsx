import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import Divider from '@mui/material/Divider';
import { Language } from '@root/types';
import apiService from '@services/api';
import { languageMap } from '@shared/LanguageDisplay';
import SectionCard from '@shared/SectionCard';
import { useTranslations } from '@translations';
import { array } from '@utils/array.utils';

import { useCityContext } from '../../context';
import {
  EnglishSpeakers,
  LanguageAverageScore,
  LanguageCategory,
  LanguageDuration,
  OtherLanguages,
} from './components';

export const LanguageData = () => {
  const { item } = useCityContext();
  const translations = useTranslations();
  const compTranslations = translations.city.language;
  const langTranslations = translations.enum.language;

  const { data } = apiService.language.use(item.language);

  const subtitle = array
    .unique([langTranslations[item.language], languageMap[item.language]])
    .join(' - ');

  const isNativeLanguage = item.language === Language.HE;
  const isEnglish = item.language === Language.EN;
  const isForeign = !isNativeLanguage && !isEnglish;

  return (
    <SectionCard
      title={compTranslations.title}
      subtitle={subtitle}
      TitleIcon={TranslateRoundedIcon}
    >
      {data && (
        <div className="text-center flex flex-col gap-4">
          {isForeign && (
            <>
              <LanguageCategory data={data} />
              <LanguageDuration data={data} />
              <OtherLanguages data={data} />
              <EnglishSpeakers />
              <Divider />
            </>
          )}
          <LanguageAverageScore />
        </div>
      )}
    </SectionCard>
  );
};
