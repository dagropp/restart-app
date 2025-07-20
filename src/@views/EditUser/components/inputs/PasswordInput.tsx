import TextField from '@common/TextField';
import { ITranslations, useTranslations } from '@translations';
import { array } from '@utils/array.utils';
import { string } from '@utils/string.utils';
import { InputHelperWrapper } from '@views/EditUser/components/inputs/InputHelperWrapper';
import { ChangeEvent, useState } from 'react';

import { InputName, PartnerInputName } from '../../types';

interface Props {
  required?: boolean;
  isCreate?: boolean;
  Enum: typeof InputName | typeof PartnerInputName;
}

const getPasswordError = (
  password: string,
  translations: ITranslations,
  isCreate?: boolean,
): string => {
  if (!isCreate || !password) return '';
  const t = translations.settings.form.password;

  const errorMessages = [];
  if (password.length < 8) errorMessages.push(t.weakPasswordChars);
  if (!/[A-Z]/.test(password)) errorMessages.push(t.weakPasswordUppercase);
  if (!/[a-z]/.test(password)) errorMessages.push(t.weakPasswordLowercase);

  if (!/\d/.test(password)) errorMessages.push(t.weakPasswordNumber);

  if (!/[\W_]/.test(password)) errorMessages.push(t.weakPasswordSpecial);

  return errorMessages.length > 0
    ? `${t.weakPasswordPrefix} ${array.joinWithLast(errorMessages, ', ', t.weakPasswordConnector)}`
    : '';
};

const PasswordInput = ({ required, isCreate, Enum }: Props) => {
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState('');
  const translations = useTranslations();
  const compTranslations = translations.settings.form.password;

  const passwordError = getPasswordError(password, translations, isCreate);
  const isVerified = string.isEmpty(verify) || password === verify;

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const update = input.value;
    const passwordErrorMsg = getPasswordError(update, translations, isCreate);
    if (passwordErrorMsg) {
      input.setCustomValidity(passwordErrorMsg);
    } else {
      input.setCustomValidity('');
    }
    setPassword(update);
    setVerify('');
  };

  const handleVerifyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const update = input.value;
    const isValid = string.isEmpty(verify) || password === update;
    setVerify(update);
    if (isValid) {
      input.setCustomValidity('');
    } else {
      input.setCustomValidity(compTranslations.noMatch);
    }
  };

  return (
    <InputHelperWrapper
      text={translations.settings.form.helper.password}
      show={required}
    >
      <div className="flex gap-4 flex-col sm:flex-row">
        <TextField
          name={Enum.Password}
          onSubmit={console.log}
          type="password"
          label={compTranslations.title}
          variant="outlined"
          autoComplete="off"
          value={password}
          onChange={handlePasswordChange}
          required={required}
          error={!!passwordError}
          helperText={passwordError}
          fullWidth
        />
        {isCreate && (
          <TextField
            type="password"
            label={compTranslations.verify}
            variant="outlined"
            autoComplete="off"
            value={verify}
            onChange={handleVerifyChange}
            error={!isVerified}
            helperText={!isVerified && compTranslations.noMatch}
            disabled={!password || !!passwordError}
            required={required}
            fullWidth
          />
        )}
      </div>
    </InputHelperWrapper>
  );
};

export default PasswordInput;
