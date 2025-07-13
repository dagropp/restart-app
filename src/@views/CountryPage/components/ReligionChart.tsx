import Link from '@common/Link';
import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import { useTheme } from '@mui/material/styles';
import { PieChart, type PieValueType } from '@mui/x-charts';
import SectionCard from '@shared/SectionCard';
import {
  interpolateTranslations,
  useTranslations,
  useTranslationsContext,
} from '@translations';
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
  const translations = useTranslations().country.religion;
  const { isRtl } = useTranslationsContext();

  return (
    <Tooltip
      title={interpolateTranslations(translations.peopleCount, {
        count: format.shortNumber(
          Math.ceil(item.population * (percentage / 100)),
        ),
      })}
      dir={isRtl ? 'rtl' : 'ltr'}
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
  const translations = useTranslations().country.religion;
  const { isRtl } = useTranslationsContext();

  const { CHRISTIANITY, ISLAM, JUDAISM, NO_RELIGION, BUDDHISM, HINDUISM } =
    item.religion;
  const other = 100 - number.sum(...object.values(item.religion));

  const series = [
    {
      value: CHRISTIANITY,
      color: theme.palette.error.light,
      label: (
        <LegendItem label={translations.christians} percentage={CHRISTIANITY} />
      ),
    },
    {
      value: ISLAM,
      color: theme.palette.success.light,
      label: <LegendItem label={translations.muslims} percentage={ISLAM} />,
    },
    {
      value: JUDAISM,
      color: theme.palette.info.light,
      label: <LegendItem label={translations.jews} percentage={JUDAISM} />,
    },
    {
      value: NO_RELIGION,
      color: theme.palette.warning.light,
      label: (
        <LegendItem
          label={translations.notReligious}
          percentage={NO_RELIGION}
        />
      ),
    },
    {
      value: BUDDHISM,
      color: theme.palette.error.dark,
      label: (
        <LegendItem label={translations.buddhists} percentage={BUDDHISM} />
      ),
    },
    {
      value: HINDUISM,
      color: theme.palette.warning.dark,
      label: <LegendItem label={translations.hindus} percentage={HINDUISM} />,
    },
    {
      value: other,
      color: theme.palette.action.disabled,
      label: (
        <LegendItem
          label={translations.other}
          percentage={Number(number.toFixed(other, 2))}
        />
      ),
    },
  ]
    .filter((item) => item.value)
    .toSorted((a, b) => b.value - a.value) as unknown as SeriesType;

  return (
    <SectionCard
      title={translations.title}
      subtitle={
        item.religionImportance && (
          <Typography
            variant="body2"
            className="text-center pt-2 text-balance"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {interpolateTranslations(translations.importance, {
              percent: item.religionImportance,
            })}
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
