import Select from '@common/Select';
import Typography from '@common/Typography';
import {
  interpolateTranslations,
  useTranslations,
  useTranslationsContext,
} from '@translations';
import { useEffect, useState } from 'react';

import { GroupInputName } from '../../types';

interface Props {
  defaultValue?: number;
}

export const ApartmentSelect = ({ defaultValue }: Props) => {
  const translations = useTranslations().settings.form;
  const { isRtl } = useTranslationsContext();

  const [value, setValue] = useState(defaultValue);

  const options = Array.from({ length: 6 }, (_, i) => {
    const value = i + 1;
    return {
      value,
      label: (
        <Typography variant="body2" dir={isRtl ? 'rtl' : 'ltr'} align="left">
          {value === 1
            ? translations.bedroomSingle
            : interpolateTranslations(translations.bedrooms, {
                bedrooms: value,
              })}
        </Typography>
      ),
    };
  });

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
