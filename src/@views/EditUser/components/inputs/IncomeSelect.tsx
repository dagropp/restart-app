import Select, { SelectOption } from '@common/Select';
import Typography from '@common/Typography';
import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { City, Currency, IncomeType } from '@root/types';
import apiService from '@services/api';
import CitySelect from '@shared/CitySelect';
import IncomeSlider from '@shared/IncomeSlider';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from '@translations';
import { incomeUtils } from '@utils/income.utils';
import { is } from '@utils/is.utils';
import { object } from '@utils/object.utils';
import { InputHelperWrapper } from '@views/EditUser/components/inputs/InputHelperWrapper';
import { useEffect, useMemo, useState } from 'react';

import { InputName, PartnerInputName } from '../../types';

interface Props {
  defaultIncome?: IncomeType;
  defaultMark?: number;
  defaultRemote?: City | null;
  required?: boolean;
  Enum: typeof InputName | typeof PartnerInputName;
}

const IncomeSelect = ({
  defaultIncome,
  defaultMark,
  defaultRemote,
  required,
  Enum,
}: Props) => {
  const translations = useTranslations();
  const compTranslations = translations.settings.form;

  const [type, setType] = useState<IncomeType>(
    defaultIncome ?? IncomeType.None,
  );
  const [gross, setGross] = useState(0);
  const [isRemote, setIsRemote] = useState(!!defaultRemote);
  const [remoteCity, setRemoteCity] = useState(defaultRemote ?? City.TEL_AVIV);
  const { data: cities } = apiService.useCities();
  const currency =
    isRemote && cities ? cities[remoteCity].country.currency : Currency.ILS;

  const options: SelectOption<IncomeType>[] = useMemo(
    () =>
      object.values(IncomeType).map((value) => {
        const data = incomeUtils.getTypeData(value, translations);
        return {
          value,
          label: (
            <div className="min-h-8 flex flex-col justify-center">
              <div>{data.title}</div>
              {data.subtitle && (
                <Typography variant="caption">{data.subtitle}</Typography>
              )}
            </div>
          ),
        };
      }),
    [translations],
  );

  const { data: income } = useQuery({
    queryKey: ['getIncome', type, isRemote, remoteCity],
    queryFn: () =>
      apiService.income.get(isRemote ? remoteCity : City.TEL_AVIV, type),
    enabled: type !== IncomeType.None,
  });

  const marks = useMemo(
    () =>
      income?.marks
        .map(({ gross }) => gross)
        .concat(income?.increments.map(({ gross }) => gross))
        .toSorted((a, b) => a - b) ?? [],
    [income?.increments, income?.marks],
  );

  useEffect(() => {
    const isDefaultMark =
      !is.nullOrUndefined(defaultMark) && defaultIncome === type;
    if (income && isDefaultMark) {
      setGross(marks[defaultMark]);
    } else if (income) {
      setGross(income.marks.at(1)?.gross ?? 0);
    }
  }, [income, defaultMark, marks, defaultIncome, type]);

  return (
    <InputHelperWrapper
      text={compTranslations.helper.profession}
      show={required}
      bottomSpacing
    >
      <div className="w-full">
        <Select
          options={options}
          name={Enum.Income}
          label={compTranslations.expectedJob}
          placeholder={compTranslations.expectedJob}
          required={required}
          value={type}
          onChange={setType}
        />
        {type !== IncomeType.None && income && (
          <div className="py-10 px-10">
            <IncomeSlider
              gross={gross}
              setGross={setGross}
              income={income}
              currency={currency}
            />
          </div>
        )}
        {type !== IncomeType.None && (
          <div className="flex items-center pb-4">
            <FormControlLabel
              className="!mr-0"
              control={
                <Checkbox
                  checked={isRemote}
                  onChange={(_, checked) => setIsRemote(checked)}
                />
              }
              slotProps={{ typography: { variant: 'body2' } }}
              label={!isRemote && compTranslations.isRemoteJob}
            />
            {isRemote && (
              <CitySelect
                label={compTranslations.remoteCity}
                placeholder={compTranslations.remoteCity}
                value={remoteCity}
                onChange={setRemoteCity}
                name={Enum.IncomeRemote}
              />
            )}
          </div>
        )}
        <input
          type="hidden"
          value={marks.indexOf(gross)}
          name={Enum.IncomeMark}
        />
      </div>
    </InputHelperWrapper>
  );
};

export default IncomeSelect;
