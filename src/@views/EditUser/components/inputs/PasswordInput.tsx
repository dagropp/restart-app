import TextField from '@common/TextField';
import { string } from '@utils/string.utils';
import { ChangeEvent, useState } from 'react';

import { InputName } from '../../types';

interface Props {
  required?: boolean;
  isCreate?: boolean;
}

const VERIFIED_PASSWORD_ERROR = 'Passwords do not match, please try again.';

const getPasswordError = (password: string, isCreate?: boolean): string => {
  if (!isCreate || !password) return '';
  const errorMessages = [];
  if (password.length < 8) errorMessages.push('at least 8 characters');
  if (!/[A-Z]/.test(password)) errorMessages.push('one uppercase letter');
  if (!/[a-z]/.test(password)) errorMessages.push('one lowercase letter');

  if (!/\d/.test(password)) errorMessages.push('one number');

  if (!/[\W_]/.test(password)) errorMessages.push('one special character');

  return errorMessages.length > 0
    ? `Password must contain ${errorMessages.join(', ')}.`
    : '';
};

const PasswordInput = ({ required, isCreate }: Props) => {
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState('');

  const passwordError = getPasswordError(password, isCreate);
  const isVerified = string.isEmpty(verify) || password === verify;

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setVerify('');
  };

  return (
    <div className="flex gap-4">
      <TextField
        name={InputName.Password}
        type="password"
        label="Password"
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
          label="Verify password"
          variant="outlined"
          autoComplete="off"
          value={verify}
          onChange={(event) => setVerify(event.target.value)}
          error={!isVerified}
          helperText={!isVerified && VERIFIED_PASSWORD_ERROR}
          disabled={!password || !!passwordError}
          required={required}
          fullWidth
        />
      )}
    </div>
  );
};

export default PasswordInput;
