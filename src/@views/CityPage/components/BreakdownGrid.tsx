import CloneElement from '@common/CloneElement';
import Typography from '@common/Typography';
import { useAppContext } from '@context/app';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import InfoTooltip from '@shared/InfoTooltip.tsx';
import {
  convertCurrency,
  type CurrencyConverter,
  formatCurrency,
} from '@utils/format.utils';
import { is } from '@utils/is.utils';
import { object } from '@utils/object.utils';
import clsx from 'clsx';
import { ActionDispatch, ChangeEvent, useMemo } from 'react';

import {
  CostRow,
  CostRowsList,
  CostStateItem,
  useCityContext,
} from '../context';
import { getSimulationStateSum } from './simulation-utils';

type BaseState = Record<string, CostStateItem>;

interface GridRowProps<T extends BaseState> {
  row: CostRow;
  currencyConverter: CurrencyConverter;
  field: keyof T;
  state: T;
  updateState: ActionDispatch<[update: Partial<T>]>;
}

interface BaseGridRowProps {
  hidden?: boolean;
  isCheckbox?: boolean;
  instances?: number;
  handleCheckboxChange?: CheckboxProps['onChange'];
  handleInstanceChange?: (value: 1 | -1) => void;
  label: string;
  onEdit?: () => void;
  value: number;
  currencyConverter: CurrencyConverter;
  tooltip?: string;
}

interface Props<T extends BaseState> {
  rows: CostRowsList<T>;
  title: string;
  state: T;
  updateState: ActionDispatch<[update: Partial<T>]>;
}

const GridRow = <T extends BaseState>({
  currencyConverter,
  row,
  state,
  updateState,
  field,
}: GridRowProps<T>) => {
  const stateData = state[field];
  const { value, hidden, instances } = stateData;

  const isInstances = is.nullOrUndefined(instances);

  const mappedValue = useMemo(() => {
    let result = value;
    if (row.mapper) result = row.mapper(result);
    if (!isInstances) result = result * instances;
    return result;
  }, [instances, isInstances, row, value]);

  const isCheckbox = row.optional;

  const handleCheckboxChange = (_: ChangeEvent, checked: boolean) => {
    if (row.optional) {
      const instancesUpdate = instances === 0 ? 1 : instances;
      updateState({
        [field]: { ...stateData, hidden: !checked, instances: instancesUpdate },
      } as Partial<T>);
    }
  };

  const handleInstanceChange = (value: 1 | -1) => {
    if (!isInstances) {
      const update = instances + value;
      const hiddenUpdate = isCheckbox ? update === 0 : undefined;
      if (update >= 0) {
        updateState({
          [field]: {
            ...stateData,
            instances: instances + value,
            hidden: hiddenUpdate,
          },
        } as Partial<T>);
      }
    }
  };

  return (
    <BaseGridRow
      hidden={hidden}
      isCheckbox={isCheckbox}
      handleCheckboxChange={handleCheckboxChange}
      label={row.label}
      tooltip={row.tooltip}
      onEdit={row.onEdit}
      value={mappedValue}
      currencyConverter={currencyConverter}
      instances={instances}
      handleInstanceChange={handleInstanceChange}
    />
  );
};

const BaseGridRow = ({
  hidden,
  isCheckbox,
  handleCheckboxChange,
  label,
  onEdit,
  value,
  currencyConverter,
  instances,
  handleInstanceChange,
  tooltip,
}: BaseGridRowProps) => {
  const { item } = useCityContext();

  const hiddenClass = hidden && 'opacity-50 select-none';

  return (
    <div className="contents">
      <Typography
        variant="body2"
        className={clsx('flex items-center gap-2', hiddenClass)}
      >
        <Checkbox
          size="small"
          className={clsx('!p-0 !pb-0.5', !isCheckbox && 'invisible')}
          checked={!hidden}
          onChange={handleCheckboxChange}
        />
        <span className="inline-flex items-center gap-2">
          <strong>{label}</strong>
          {tooltip && <InfoTooltip title={tooltip} placement="top" />}
        </span>
        {!is.nullOrUndefined(instances) && handleInstanceChange && (
          <span className="flex items-center">
            <IconButton
              size="small"
              onClick={() => handleInstanceChange(-1)}
              disabled={instances <= 0}
            >
              <RemoveRoundedIcon fontSize="small" />
            </IconButton>
            <strong>{instances}</strong>
            <IconButton size="small" onClick={() => handleInstanceChange(1)}>
              <AddRoundedIcon fontSize="small" />
            </IconButton>
          </span>
        )}
        {onEdit && (
          <IconButton onClick={onEdit} size="small" disabled={hidden}>
            <EditRoundedIcon fontSize="small" />
          </IconButton>
        )}
      </Typography>
      <Typography variant="body2" className={clsx('text-right', hiddenClass)}>
        {formatCurrency(value, item.country.currency)}
      </Typography>
      <Typography variant="body2" className={clsx('text-right', hiddenClass)}>
        {currencyConverter(value)}
      </Typography>
    </div>
  );
};

export const BreakdownGridSkeleton = ({
  title,
}: Pick<Props<BaseState>, 'title'>) => {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-2 pb-3 justify-between">
        <Typography variant="h6">
          {title}{' '}
          <Typography variant="caption" color="textSecondary">
            <strong>/ Month</strong>
          </Typography>
        </Typography>
      </div>
      <div className="grid grid-cols-[2fr_0.5fr_0.5fr] gap-2 items-baseline">
        <CloneElement times={12}>
          <Skeleton variant="text" />
        </CloneElement>
        <Divider className="col-span-3" />
        <CloneElement times={3}>
          <Skeleton variant="text" />
        </CloneElement>
      </div>
    </div>
  );
};

const BreakdownGrid = <T extends BaseState>({
  rows,
  title,
  state,
  updateState,
}: Props<T>) => {
  const { currency: ctxCurrency, currencies } = useAppContext();
  const { item } = useCityContext();
  const currencyConverter = convertCurrency(
    currencies,
    ctxCurrency,
    item.country.currency,
  );

  const total = useMemo(
    () => getSimulationStateSum(rows, state),
    [rows, state],
  );

  return (
    <div className="flex-1">
      <div className="flex items-center gap-2 pb-3 justify-between">
        <Typography variant="h6">
          {title}{' '}
          <Typography variant="caption" color="textSecondary">
            <strong>/ Month</strong>
          </Typography>
        </Typography>
      </div>
      <div className="grid grid-cols-[2fr_0.5fr_0.5fr] gap-2 items-baseline">
        {object.entries(rows).map(([key, row]) => (
          <GridRow
            key={String(key)}
            row={row}
            currencyConverter={currencyConverter}
            state={state}
            updateState={updateState}
            field={key}
          />
        ))}
        <Divider className="col-span-3" />
        <BaseGridRow
          label="Total"
          currencyConverter={currencyConverter}
          value={total}
        />
      </div>
    </div>
  );
};

export default BreakdownGrid;
