import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import { useAppContext } from '@context/app';
import { useUserContext } from '@context/user';
import { useTheme } from '@mui/material/styles';
import { Currency } from '@root/types';
import { CostResponse, DisplayableCostFields } from '@services/api';
import {
  interpolateTranslations,
  useTranslations,
  useTranslationsContext,
} from '@translations';
import { costUtils, type PriceFieldData } from '@utils/cost.utils';
import { CurrencyConverterToNumber, formatCurrency } from '@utils/format.utils';
import { number } from '@utils/number.utils';

interface CostDataProps {
  data: CostResponse;
  currency: Currency;
  converter: CurrencyConverterToNumber;
}

interface Props {
  field: keyof DisplayableCostFields;
  city: CostDataProps;
  other: CostDataProps;
}

interface Translation {
  label: string;
  caption?: string;
}

type ValueTuple = [number, number] | [number];

const convertValues = (
  { data, converter }: CostDataProps,
  field: keyof CostResponse,
  { rangeKey, mapper = defaultMapper }: PriceFieldData,
) => {
  const mapped = mapper(data[field]);
  const converted = converter(mapped);
  const mappedRange = rangeKey && mapper(data[rangeKey]);
  const convertedRange = mappedRange && converter(mappedRange);

  return {
    original: [mapped, mappedRange].filter(Boolean) as ValueTuple,
    converted: [converted, convertedRange].filter(Boolean) as ValueTuple,
  };
};

const getPercent = (value: number, other: number) =>
  Number(number.toFixed((value / other - 1) * 100));

const getDiff = (city: number, other: number) => {
  if (city === other) return { city: 0, other: 0 };
  return { city: getPercent(city, other), other: getPercent(other, city) };
};

const defaultMapper = (value: number) => value;

interface DiffItemProps {
  value: number;
  className?: string;
}

interface LabelItemProps {
  converted: ValueTuple;
  original: ValueTuple;
  currency: Currency;
  isFloat?: boolean;
  className?: string;
}

const DiffItem = ({ value, className }: DiffItemProps) => {
  const { palette } = useTheme();

  const color = value > 0 ? palette.error.light : palette.success.light;
  const operator = value > 0 ? '+' : '';

  if (!value) return <div />;

  return (
    <Typography variant="body2" style={{ color }} className={className}>
      {operator}
      {value}%
    </Typography>
  );
};

const LabelItem = ({
  converted,
  original,
  currency,
  className,
  isFloat,
}: LabelItemProps) => {
  const { currency: ctxCurrency } = useAppContext();

  const format = (value: number) => formatCurrency(value, ctxCurrency, isFloat);
  const formatOg = (value: number) => formatCurrency(value, currency, isFloat);

  return (
    <Tooltip
      title={
        original[1]
          ? `${formatOg(original[0])} - ${formatOg(original[1])}`
          : formatOg(original[0])
      }
    >
      <Typography variant="body2" fontWeight="500" className={className}>
        {format(converted[0])}
        {converted[1] && ` - ${format(converted[1])}`}
      </Typography>
    </Tooltip>
  );
};

export const PriceListItem = ({ field, city, other }: Props) => {
  const { group } = useUserContext();
  const fieldData = costUtils.map[field];
  const { isRtl } = useTranslationsContext();

  const { label, caption: tCaption } = useTranslations().enum.cost[
    field
  ] as Translation;
  const caption =
    field === 'rentOuter'
      ? interpolateTranslations(tCaption!, { bedrooms: group.bedrooms })
      : tCaption;

  const cityValue = convertValues(city, field, fieldData);
  const otherValue = convertValues(other, field, fieldData);
  const diff = getDiff(cityValue.converted[0], otherValue.converted[0]);

  return (
    <>
      <DiffItem value={diff.city} className="text-end" />
      <LabelItem
        currency={city.currency}
        className="text-start"
        {...cityValue}
      />
      <div
        className="flex items-center justify-center gap-1"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <Typography variant="body2">{label}</Typography>
        {caption && <Typography variant="caption">{caption}</Typography>}
      </div>
      <LabelItem
        currency={other.currency}
        className="text-end"
        {...otherValue}
      />
      <DiffItem value={diff.other} />
    </>
  );
};
