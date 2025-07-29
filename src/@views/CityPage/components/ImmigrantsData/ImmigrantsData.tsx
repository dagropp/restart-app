import MosqueRoundedIcon from '@mui/icons-material/MosqueRounded';
import Divider from '@mui/material/Divider';
import SectionCard from '@shared/SectionCard';
import { useTranslations } from '@translations';

import {
  NeighborhoodDisplay,
  OriginDisplay,
  PercentageDisplay,
} from './components';

const divider = <Divider className="!my-4 !mx-auto w-[90%]" />;

export const ImmigrantsData = () => {
  const translations = useTranslations().city.immigrants;

  return (
    <SectionCard title={translations.title} TitleIcon={MosqueRoundedIcon}>
      <PercentageDisplay />
      {divider}
      <OriginDisplay />
      {divider}
      <NeighborhoodDisplay />
    </SectionCard>
  );
};
