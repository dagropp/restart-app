import { Country } from '@root/types';
import CountrySelect from '@shared/CountrySelect';
import { useState } from 'react';

import { InputName } from '../../types';

const DEFAULT_COUNTRY = Country.ISRAEL;

interface Props {
  defaultValue?: Country[];
  required?: boolean;
}

const CitizenshipSelect = ({
  defaultValue = [DEFAULT_COUNTRY],
  required,
}: Props) => {
  const [selected, setSelected] = useState<Country[]>(defaultValue);

  return (
    <CountrySelect
      name={InputName.Citizenship}
      value={selected}
      onChange={setSelected}
      label="Citizenship"
      placeholder="Citizenship"
      required={required}
      defaultCountry={Country.ISRAEL}
    />
  );
};

export default CitizenshipSelect;
