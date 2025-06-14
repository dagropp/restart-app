import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import IconButton from '@mui/material/IconButton';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { GroupInputName } from '../../types';

interface Props {
  defaultValue?: string;
}

export const DepartureDateInput = ({ defaultValue }: Props) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs(defaultValue));

  const handleChange = (update: Dayjs | null) => setValue(update);

  const pickerValue = dayjs(dayjs(value).format('YYYY-MM'));

  useEffect(() => {
    if (defaultValue) setValue(dayjs(defaultValue));
  }, [defaultValue]);

  return (
    <>
      <div className="relative border-red-400">
        <DatePicker
          className="w-full"
          value={pickerValue}
          onChange={handleChange}
          minDate={dayjs(dayjs().format('YYYY-MM'))}
          label="Departure Date"
          views={['month', 'year']}
        />
        <IconButton
          className="!absolute right-8 top-2"
          onClick={() => setValue(null)}
        >
          <ClearRoundedIcon />
        </IconButton>
      </div>
      {value && (
        <input
          type="hidden"
          name={GroupInputName.DepartureDate}
          value={value.format()}
        />
      )}
    </>
  );
};
