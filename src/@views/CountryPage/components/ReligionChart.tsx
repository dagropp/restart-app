import Link from '@common/Link';
import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import { useTheme } from '@mui/material/styles';
import { PieChart, type PieValueType } from '@mui/x-charts';
import SectionCard from '@shared/SectionCard';
import { format } from '@utils/format.utils';
import { number } from '@utils/number.utils';
import { object } from '@utils/object.utils';

import { useCountryContext } from '../context';

interface LegendItemProps {
  label: string;
  percentage: number;
}

type SeriesType = Omit<PieValueType, 'id'>[];

const RELIGIOUS_IMPORTANCE_LINK =
  'https://en.wikipedia.org/wiki/Importance_of_religion_by_country';

const LegendItem = ({ label, percentage }: LegendItemProps) => {
  const { item } = useCountryContext();

  return (
    <Tooltip
      title={`${format.shortNumber(Math.ceil(item.population * (percentage / 100)))} People`}
      placement="top"
    >
      <span>
        {label} ({percentage}%)
      </span>
    </Tooltip>
  );
};

export const ReligionChart = () => {
  const { item } = useCountryContext();
  const theme = useTheme();

  const { CHRISTIANITY, ISLAM, JUDAISM, NO_RELIGION, BUDDHISM, HINDUISM } =
    item.religion;
  const other = 100 - number.sum(...object.values(item.religion));

  const series = [
    {
      value: CHRISTIANITY,
      color: theme.palette.error.light,
      label: <LegendItem label="Christians" percentage={CHRISTIANITY} />,
    },
    {
      value: ISLAM,
      color: theme.palette.success.light,
      label: <LegendItem label="Muslims" percentage={ISLAM} />,
    },
    {
      value: JUDAISM,
      color: theme.palette.info.light,
      label: <LegendItem label="Jews" percentage={JUDAISM} />,
    },
    {
      value: NO_RELIGION,
      color: theme.palette.warning.light,
      label: <LegendItem label="Not Religious" percentage={NO_RELIGION} />,
    },
    {
      value: BUDDHISM,
      color: theme.palette.error.dark,
      label: <LegendItem label="Buddhists" percentage={BUDDHISM} />,
    },
    {
      value: HINDUISM,
      color: theme.palette.warning.dark,
      label: <LegendItem label="Hindus" percentage={HINDUISM} />,
    },
    {
      value: other,
      color: theme.palette.action.disabled,
      label: (
        <LegendItem
          label="Other"
          percentage={Number(number.toFixed(other, 2))}
        />
      ),
    },
  ]
    .filter((item) => item.value)
    .toSorted((a, b) => b.value - a.value) as unknown as SeriesType;

  return (
    <SectionCard
      title="Religion"
      subtitle={
        item.religionImportance && (
          <Typography variant="body2" className="text-center pt-2 text-balance">
            {item.religionImportance}% of the population consider religion
            important in their daily life.{' '}
            <Link href={RELIGIOUS_IMPORTANCE_LINK} external />
          </Typography>
        )
      }
    >
      <PieChart
        className="z-20"
        series={[
          {
            data: series,
            innerRadius: 60,
            valueFormatter: () => null,
            highlightScope: { fade: 'global', highlight: 'item' },
          },
        ]}
        height={250}
        slotProps={{ pieArc: { className: '!stroke-transparent' } }}
      />
    </SectionCard>
  );
};
