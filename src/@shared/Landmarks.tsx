import Accordion from '@common/Accordion';
import CloneElement from '@common/CloneElement';
import Link from '@common/Link';
import Typography from '@common/Typography';
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import Skeleton from '@mui/material/Skeleton';
import apiService, { LandmarkItem } from '@services/api';
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
  const { data, isLoading } = apiService.wiki.useSummary(item.key, expanded);

  return (
    <Accordion
      key={item.key}
      expanded={expanded}
      handleExpand={handleExpand}
      title={item.title}
    >
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <Typography variant="body2">
            <CloneElement times={6}>
              <Skeleton variant="text" />
            </CloneElement>
            <Skeleton variant="text" width="50%" />
          </Typography>
        ) : data ? (
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{ __html: data.extract_html }}
          />
        ) : (
          <Typography variant="body2">Could not fetch data</Typography>
        )}
        <Link
          external
          href={`https://en.wikipedia.org/wiki/${item.key}`}
          className="w-max"
        >
          <Typography variant="body2">Wikipedia</Typography>
        </Link>
      </div>
    </Accordion>
  );
};

const Landmarks = ({ items }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleExpand = (key: string) => () =>
    setSelected((prev) => (prev === key ? null : key));

  return (
    <SectionCard title="Landmarks" TitleIcon={PushPinRoundedIcon}>
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
