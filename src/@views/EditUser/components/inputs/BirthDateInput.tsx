import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { InputName } from '../../types';

interface Props {
  defaultValue?: string;
  required?: boolean;
}

const BirthDateInput = ({ defaultValue, required }: Props) => {
  return (
    <DatePicker
      name={InputName.DateOfBirth}
      defaultValue={dayjs(defaultValue)}
      label={`Date of Birth${required ? ' *' : ''}`}
    />
  );
};

export default BirthDateInput;
