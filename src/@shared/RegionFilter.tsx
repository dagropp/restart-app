import Select, { SelectOption } from '@common/Select';
import Tooltip from '@common/Tooltip';
import useIsOverflow from '@hooks/useIsOverflow';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import { Region, ValidRegion } from '@root/types';
import { ITranslations, useTranslations } from '@translations';
import { object } from '@utils/object.utils';

interface Props {
  onChange: (value: ValidRegion[]) => void;
  filter: ValidRegion[];
}

interface ListProps {
  items: ValidRegion[];
}

const getRegions = (t: ITranslations): Record<ValidRegion, string> => {
  const translations = t.table.map.regions;
  return {
    [Region.EUROPE]: translations.europe,
    [Region.NORTH_AMERICA]: translations.northAmerica,
    [Region.ASIA]: translations.emea,
    [Region.OCEANIA]: translations.oceania,
  };
};

const List = ({ items }: ListProps) => {
  const theme = useTheme();
  const translations = useTranslations();

  return items.map((item) => (
    <div
      key={item}
      className="border border-solid p-2 rounded min-w-max"
      style={{ borderColor: theme.palette.divider }}
    >
      {getRegions(translations)[item]}
    </div>
  ));
};

const RegionFilter = ({ filter, onChange }: Props) => {
  const { ref, isOverflow } = useIsOverflow<HTMLDivElement>('x');
  const translations = useTranslations();

  const options: SelectOption<ValidRegion>[] = object
    .entries(getRegions(translations))
    .map(([value, label]) => ({
      value,
      label: (
        <>
          <Checkbox checked={filter.includes(value)} />
          {label}
        </>
      ),
    }));

  return (
    <Select
      options={options}
      value={filter}
      onChange={onChange}
      multiple
      label={translations.table.filters.region}
      placeholder={translations.table.filters.region}
      renderValue={(items) => {
        return (
          <Tooltip
            title={
              isOverflow && (
                <div className="flex gap-2 items-center flex-wrap p-2 max-w-[400px]">
                  <List items={items} />
                </div>
              )
            }
          >
            <div
              className="flex gap-2 items-center overflow-hidden"
              ref={ref}
              key={items.join(',')}
            >
              <List items={items} />
            </div>
          </Tooltip>
        );
      }}
    />
  );
};

export default RegionFilter;
