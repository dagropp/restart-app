import Button from '@common/Button';
import Typography from '@common/Typography';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { type UserResponse } from '@services/api';
import { useState } from 'react';

import { InputName, type SignUpData } from '../types';
import AvatarUpload from './AvatarUpload';
import { EditGroupFormInputs } from './EditGroupFormInputs';
import { handleFormSubmit, StipendSelect } from './inputs';
import BirthDateInput from './inputs/BirthDateInput';
import CitizenshipSelect from './inputs/CitizenshipSelect';
import FirstNameInput from './inputs/FirstNameInput';
import IncomeSelect from './inputs/IncomeSelect';
import LastNameInput from './inputs/LastNameInput';
import PasswordInput from './inputs/PasswordInput';

interface Props {
  user?: UserResponse;
  email?: string;
  onSubmit: (data: SignUpData) => Promise<void>;
  submitButton: { label: string; loading?: boolean };
  title?: string;
  subtitle?: string;
  createNewGroup?: boolean;
}

const EditUserForm = ({
  user,
  email,
  onSubmit,
  submitButton,
  title,
  subtitle,
  createNewGroup,
}: Props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const theme = useTheme();

  const handleSubmit = handleFormSubmit<SignUpData>(onSubmit);

  return (
    <>
      {(title || subtitle) && (
        <div className="text-center">
          {title && <Typography variant="h6">{title}</Typography>}
          {subtitle && (
            <Typography variant="body2" className="pb-5">
              {subtitle}
            </Typography>
          )}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full pb-5">
        <TextField
          name={InputName.Email}
          type="email"
          label="Email"
          variant="outlined"
          value={email ?? user?.email}
          disabled
          fullWidth
        />
        <div className="flex gap-4">
          <FirstNameInput
            required={!user}
            onChange={(event) => setFirstName(event.target.value)}
            defaultValue={user?.firstName}
          />
          <LastNameInput
            required={!user}
            onChange={(event) => setLastName(event.target.value)}
            defaultValue={user?.lastName}
          />
        </div>
        <CitizenshipSelect defaultValue={user?.citizenship} required={!user} />
        <BirthDateInput defaultValue={user?.dateOfBirth} required={!user} />
        {!user && <PasswordInput required isCreate />}
        <IncomeSelect
          defaultIncome={user?.income}
          defaultMark={user?.incomeMark}
          defaultRemote={user?.incomeRemote}
          required={!user}
        />
        <StipendSelect user={user} />
        <AvatarUpload
          firstName={firstName}
          lastName={lastName}
          defaultValue={user?.avatar}
        />
        {createNewGroup && (
          <div
            className="border-t mt-4 pt-4"
            style={{ borderColor: theme.palette.divider }}
          >
            <EditGroupFormInputs />
          </div>
        )}
        <Button
          variant="contained"
          size="large"
          type="submit"
          loading={submitButton.loading}
        >
          {submitButton.label}
        </Button>
      </form>
    </>
  );
};

export default EditUserForm;
