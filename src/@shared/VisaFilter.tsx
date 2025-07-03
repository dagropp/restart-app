import Select, { SelectOption } from '@common/Select';
import Tooltip from '@common/Tooltip';
import useIsOverflow from '@hooks/useIsOverflow';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import { VisaLevel } from '@root/types';
import VisaDisplay from '@shared/VisaDisplay';
import { useTranslations } from '@translations';

interface Props {
  filter: VisaLevel[];
  onChange: (value: VisaLevel[]) => void;
}

interface ListProps {
  items: VisaLevel[];
}

const visas = [VisaLevel.None, VisaLevel.Easy, VisaLevel.Medium];

const List = ({ items }: ListProps) => {
  const theme = useTheme();

  return items.map((item) => (
    <div
      key={item}
      className="border border-solid p-2 rounded min-w-max"
      style={{ borderColor: theme.palette.divider }}
    >
      <VisaDisplay level={item} type="short" />
    </div>
  ));
};

const VisaFilter = ({ filter, onChange }: Props) => {
  const { ref, isOverflow } = useIsOverflow<HTMLDivElement>('x');
  const translations = useTranslations().table.filters;

  const options: SelectOption<VisaLevel>[] = visas.map((value) => ({
    value,
    label: (
      <>
        <Checkbox checked={filter.includes(value)} />
        <VisaDisplay key={value} level={value} type="short" />
      </>
    ),
  }));

  return (
    <Select
      options={options}
      value={filter}
      multiple
      onChange={onChange}
      label={translations.visa}
      placeholder={translations.visa}
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

export default VisaFilter;
