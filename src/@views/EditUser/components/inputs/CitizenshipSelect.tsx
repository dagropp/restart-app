import { Country } from '@root/types';
import CountrySelect from '@shared/CountrySelect';
import { useTranslations } from '@translations';
import { InputHelperWrapper } from '@views/EditUser/components/inputs/InputHelperWrapper';
import { useState } from 'react';

import { InputName, PartnerInputName } from '../../types';

const DEFAULT_COUNTRY = Country.ISRAEL;

interface Props {
  defaultValue?: Country[];
  required?: boolean;
  Enum: typeof InputName | typeof PartnerInputName;
}

const CitizenshipSelect = ({
  defaultValue = [DEFAULT_COUNTRY],
  required,
  Enum,
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
        name={Enum.Citizenship}
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
