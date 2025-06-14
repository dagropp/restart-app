import Select, { SelectOption } from '@common/Select';
import { useEffect, useState } from 'react';

import { GroupInputName } from '../../types';

interface Props {
  defaultValue?: number;
}

const options: SelectOption<number>[] = [
  { value: 1, label: '1 Bedroom' },
  { value: 2, label: '2 Bedrooms' },
  { value: 3, label: '3 Bedrooms' },
  { value: 4, label: '4 Bedrooms' },
  { value: 5, label: '5 Bedrooms' },
  { value: 6, label: '6 Bedrooms' },
];

export const ApartmentSelect = ({ defaultValue }: Props) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Select
      options={options}
      value={value}
      onChange={setValue}
      name={GroupInputName.Bedrooms}
      placeholder="Apartment Size"
      label="Apartment Size"
    />
  );
};
