import { Country } from '@root/types';
import CountrySelect from '@shared/CountrySelect';
import { useTranslations } from '@translations';
import { InputHelperWrapper } from '@views/EditUser/components/inputs/InputHelperWrapper.tsx';
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
  const translations = useTranslations().settings.form;

  return (
    <InputHelperWrapper
      show={required}
      text={translations.helper.citizenship}
      bottomSpacing
    >
      <CountrySelect
        name={InputName.Citizenship}
        value={selected}
        onChange={setSelected}
        label={translations.citizenship}
        placeholder={translations.citizenship}
        required={required}
        defaultCountry={Country.ISRAEL}
      />
    </InputHelperWrapper>
  );
};

export default CitizenshipSelect;
