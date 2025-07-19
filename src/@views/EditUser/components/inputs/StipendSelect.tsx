import TextField from '@common/TextField';
import { Currency } from '@root/types';
import { UserResponse } from '@services/api';
import { CurrencyMenu } from '@shared/index';
import { useTranslations } from '@translations';
import { InputHelperWrapper } from '@views/EditUser/components/inputs/InputHelperWrapper';
import { ChangeEvent, useState } from 'react';

import { InputName, PartnerInputName } from '../../types';

interface Props {
  user?: UserResponse;
  isSignUp: boolean;
  Enum: typeof InputName | typeof PartnerInputName;
}

export const StipendSelect = ({ user, isSignUp, Enum }: Props) => {
  const translations = useTranslations().settings.form;

  const [currency, setCurrency] = useState(
    user?.stipendCurrency ?? Currency.ILS,
  );
  const [value, setValue] = useState(user?.stipendValue ?? '');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const stripped = value.replaceAll(',', '');
    if (!stripped) {
      setValue('');
    } else {
      const asNumber = Number(stripped);
      if (!isNaN(asNumber)) setValue(asNumber.toLocaleString());
    }
  };

  return (
    <InputHelperWrapper text={translations.helper.stipend} show={isSignUp}>
      <div className="flex gap-4 w-full items-center relative">
        <TextField
          label={translations.monthlyStipend}
          fullWidth
          inputMode="numeric"
          name={Enum.StipendValue}
          slotProps={{
            htmlInput: { min: 0 },
            input: {
              startAdornment: (
                <div className="pr-1">
                  <CurrencyMenu value={currency} onChange={setCurrency} />
                </div>
              ),
            },
          }}
          value={value}
          onChange={handleChange}
        />
        {!!value && (
          <input type="hidden" value={currency} name={Enum.StipendCurrency} />
        )}
      </div>
    </InputHelperWrapper>
  );
};
