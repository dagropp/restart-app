import Accordion from '@common/Accordion';
import CloneElement from '@common/CloneElement';
import Link from '@common/Link';
import Typography from '@common/Typography';
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import Skeleton from '@mui/material/Skeleton';
import apiService, { LandmarkItem } from '@services/api';
import { useTranslations } from '@translations';
import { useState } from 'react';

import SectionCard from './SectionCard';

interface Props {
  items: LandmarkItem[];
}

interface LandmarkItemComponentProps {
  item: LandmarkItem;
  expanded: boolean;
  handleExpand: () => void;
}

const LandmarkItemComponent = ({
  item,
  expanded,
  handleExpand,
}: LandmarkItemComponentProps) => {
  const { data, isLoading } = apiService.wiki.useSummary(
    item.language,
    item.key,
    expanded,
  );
  const translations = useTranslations().city;
  const compTranslations = translations.landmarks;

  const dir = item.language === 'he' ? 'rtl' : 'ltr';

  return (
    <Accordion
      key={item.key}
      expanded={expanded}
      handleExpand={handleExpand}
      title={item.title}
    >
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <Typography variant="body2" dir={dir}>
            <CloneElement times={6}>
              <Skeleton variant="text" />
            </CloneElement>
            <Skeleton variant="text" width="50%" />
          </Typography>
        ) : data ? (
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{ __html: data.extract_html }}
            align="justify"
            dir={dir}
          />
        ) : (
          <Typography variant="body2">{compTranslations.error}</Typography>
        )}
        <Link
          external
          href={`https://${item.language}.wikipedia.org/wiki/${item.key}`}
          className="w-max"
        >
          <Typography variant="body2">{translations.wiki.wikipedia}</Typography>
        </Link>
      </div>
    </Accordion>
  );
};

const Landmarks = ({ items }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);
  const translations = useTranslations().city.landmarks;

  const handleExpand = (key: string) => () =>
    setSelected((prev) => (prev === key ? null : key));

  return (
    <SectionCard title={translations.title} TitleIcon={PushPinRoundedIcon}>
      {items.map((item) => (
        <LandmarkItemComponent
          key={item.key}
          item={item}
          expanded={selected === item.key}
          handleExpand={handleExpand(item.key)}
        />
      ))}
    </SectionCard>
  );
};

export default Landmarks;
