import Rating from '@common/Rating';
import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import Divider from '@mui/material/Divider';
import { City } from '@root/types';
import apiService, { ScoreKey } from '@services/api';
import { object } from '@utils/object.utils';
import clsx from 'clsx';
import { type ReactNode } from 'react';

interface Props {
  city: City;
  averageHidden?: boolean;
  className?: string;
}

interface ScoreItemData {
  label: string;
  description?: ReactNode;
}

interface ScoreItemComponentProps {
  value: number;
  scoreKey: ScoreKey;
}

const map: Record<ScoreKey, ScoreItemData> = {
  average: { label: 'Average' },
  cost: {
    label: 'Cost of Living',
    description:
      'Comparison of income vs. living costs for single and dual-income households',
  },
  distance: {
    label: 'Distance',
    description: 'Comparison of travel time and flight costs to Israel',
  },
  language: {
    label: 'Language',
    description: 'Comparison of English and Hebrew proficiency levels',
  },
  qualityRank: { label: 'Quality of Life Rank' },
  timezone: {
    label: 'Time Zone',
    description: 'Comparison of time zone differences with Israel',
  },
  visa: {
    label: 'Visa Requirements',
    description: 'Comparison of work visa eligibility and requirements',
  },
  weather: {
    label: 'Weather',
    description: 'Comparison of climate, rainfall, and sunshine hours',
  },
  urbanism: {
    label: 'Urbanism',
    description: 'Comparison of population, density and stature',
  },
};

const ScoreItemComponent = ({ value, scoreKey }: ScoreItemComponentProps) => {
  const { label, description } = map[scoreKey];

  return (
    <>
      <Rating value={value} base={10} readOnly tooltip />
      <span className="flex items-center gap-1">
        <Typography variant="caption">{label}</Typography>
        {description && (
          <Tooltip
            title={
              <Typography variant="body2" className="py-1 px-2">
                {description}
              </Typography>
            }
          >
            <InfoRoundedIcon fontSize="inherit" />
          </Tooltip>
        )}
      </span>
    </>
  );
};

const ScoreDisplay = ({ city, averageHidden, className }: Props) => {
  const { data: scores } = apiService.score.use();
  const { average, ...sections } = scores[city] ?? {};

  return (
    <div
      className={clsx(
        'grid gap-2 grid-cols-[max-content_1fr] items-center',
        className,
      )}
    >
      {!averageHidden && (
        <>
          <ScoreItemComponent value={average} scoreKey="average" />
          <Divider className="col-span-2" />
        </>
      )}
      {object.entries(sections).map(([key, score]) => (
        <ScoreItemComponent key={key} value={score} scoreKey={key} />
      ))}
    </div>
  );
};

export default ScoreDisplay;
