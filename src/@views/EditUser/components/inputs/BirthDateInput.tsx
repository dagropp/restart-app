import DatePicker from '@common/DatePicker';
import { useTranslations } from '@translations';
import dayjs from 'dayjs';

import { InputName } from '../../types';

interface Props {
  defaultValue?: string;
  required?: boolean;
}

const BirthDateInput = ({ defaultValue, required }: Props) => {
  const translations = useTranslations().settings.form;

  return (
    <DatePicker
      name={InputName.DateOfBirth}
      defaultValue={dayjs(defaultValue)}
      label={`${translations.dateOfBirth}${required ? ' *' : ''}`}
    />
  );
};

export default BirthDateInput;
