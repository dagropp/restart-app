import TextField from '@common/TextField';
import { Currency } from '@root/types';
import { UserResponse } from '@services/api';
import { CurrencyMenu } from '@shared/index';
import { InputName } from '@views/EditUser/types';
import { ChangeEvent, useState } from 'react';

interface Props {
  user?: UserResponse;
}

const LABEL = 'Monthly Scholarship / Stipend';

export const StipendSelect = ({ user }: Props) => {
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
    <div className="flex gap-4 w-full items-center relative">
      <TextField
        label={LABEL}
        fullWidth
        inputMode="numeric"
        name={InputName.StipendValue}
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
        <input
          type="hidden"
          value={currency}
          name={InputName.StipendCurrency}
        />
      )}
    </div>
  );
};
