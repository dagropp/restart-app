import DatePicker from '@common/DatePicker';
import { useTranslations } from '@translations';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

import { InputName, PartnerInputName } from '../../types';

interface Props {
  defaultValue?: string;
  required?: boolean;
  Enum: typeof InputName | typeof PartnerInputName;
}

const BirthDateInput = ({ defaultValue, required, Enum }: Props) => {
  const translations = useTranslations().settings.form;

  const [value, setValue] = useState<Dayjs | null>(dayjs(defaultValue));

  const handleChange = (update: Dayjs | null) => setValue(update);

  const pickerValue = dayjs(dayjs(value).locale('en').format('YYYY-MM-DD'));

  return (
    <>
      <DatePicker
        onChange={handleChange}
        value={pickerValue}
        defaultValue={dayjs(defaultValue)}
        label={`${translations.dateOfBirth}${required ? ' *' : ''}`}
      />
      <input type="hidden" name={Enum.DateOfBirth} value={value?.format()} />
    </>
  );
};

export default BirthDateInput;
