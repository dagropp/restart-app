import TextField from '@common/TextField';
import { ITranslations, useTranslations } from '@translations';
import { array } from '@utils/array.utils.ts';
import { string } from '@utils/string.utils';
import { InputHelperWrapper } from '@views/EditUser/components/inputs/InputHelperWrapper.tsx';
import { ChangeEvent, useState } from 'react';

import { InputName } from '../../types';

interface Props {
  required?: boolean;
  isCreate?: boolean;
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

const PasswordInput = ({ required, isCreate }: Props) => {
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState('');
  const translations = useTranslations();
  const compTranslations = translations.settings.form.password;

  const passwordError = getPasswordError(password, translations, isCreate);
  const isVerified = string.isEmpty(verify) || password === verify;

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setVerify('');
  };

  return (
    <InputHelperWrapper
      text={translations.settings.form.helper.password}
      show={required}
    >
      <div className="flex gap-4 flex-col sm:flex-row">
        <TextField
          name={InputName.Password}
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
            onChange={(event) => setVerify(event.target.value)}
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
