import Button from '@common/Button';
import TextField from '@common/TextField';
import Typography from '@common/Typography';
import { type UserResponse } from '@services/api';
import { useTranslations } from '@translations';
import { useState } from 'react';

import { InputName, PartnerInputName } from '../types';
import AvatarUpload from './AvatarUpload';
import { InputHelperWrapper, StipendSelect } from './inputs';
import BirthDateInput from './inputs/BirthDateInput';
import CitizenshipSelect from './inputs/CitizenshipSelect';
import IncomeSelect from './inputs/IncomeSelect';
import PasswordInput from './inputs/PasswordInput';

interface Props {
  user?: UserResponse;
  email?: string;
  isSignUp: boolean;
  type: 'user' | 'partner';
}

export const EditUserFormInputs = ({ type, user, email, isSignUp }: Props) => {
  const translations = useTranslations().settings.form;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isCreatingUser, setIsCreatingUser] = useState(type === 'user');

  const Enum = type === 'user' ? InputName : PartnerInputName;

  const isCreatingPartnerUser = isCreatingUser && type === 'partner';

  const emailField = (
    <TextField
      name={Enum.Email}
      type="email"
      label={translations.email}
      variant="outlined"
      value={type === 'user' ? (email ?? user?.email) : undefined}
      disabled={type === 'user'}
      fullWidth
      autoFocus={isCreatingPartnerUser}
    />
  );

  return (
    <>
      {type === 'partner' && (
        <InputHelperWrapper
          show={true}
          text={translations.helper.partnerInfo}
        />
      )}
      <Typography variant="body1" fontWeight="500" align="center">
        {translations.sections.personalDetails}
      </Typography>
      <div className="flex gap-4 flex-col sm:flex-row">
        <TextField
          name={Enum.FirstName}
          type="text"
          label={translations.firstName}
          variant="outlined"
          autoComplete="given-name"
          fullWidth
          required={isSignUp}
          onChange={(event) => setFirstName(event.target.value)}
          defaultValue={user?.firstName}
          autoFocus
        />
        <TextField
          name={Enum.LastName}
          type="text"
          label={translations.lastName}
          variant="outlined"
          autoComplete="family-name"
          fullWidth
          required={isSignUp}
          onChange={(event) => setLastName(event.target.value)}
          defaultValue={user?.lastName}
        />
      </div>
      <BirthDateInput
        defaultValue={user?.dateOfBirth}
        required={isSignUp}
        Enum={Enum}
      />
      <AvatarUpload
        firstName={firstName}
        lastName={lastName}
        defaultValue={user?.avatar}
        Enum={Enum}
      />
      {isCreatingUser && (
        <>
          <Typography variant="body1" fontWeight="500" align="center" mt={2}>
            {translations.sections.loginCredentials}
          </Typography>
          {emailField}
          {isSignUp && <PasswordInput required isCreate Enum={Enum} />}
        </>
      )}
      {type === 'partner' && (
        <InputHelperWrapper
          text={translations.helper.partnerLogin}
          show={!isCreatingUser}
        >
          <Button onClick={() => setIsCreatingUser((prev) => !prev)}>
            {isCreatingUser
              ? translations.removeUserFromPartner
              : translations.createUserForPartner}
          </Button>
        </InputHelperWrapper>
      )}
      <Typography variant="body1" fontWeight="500" align="center" mt={2}>
        {translations.sections.additionalInfo}
      </Typography>
      <CitizenshipSelect
        defaultValue={user?.citizenship}
        required={isSignUp}
        Enum={Enum}
      />
      <IncomeSelect
        defaultIncome={user?.income}
        defaultMark={user?.incomeMark}
        defaultRemote={user?.incomeRemote}
        required={isSignUp}
        Enum={Enum}
      />
      <StipendSelect user={user} isSignUp={isSignUp} Enum={Enum} />
    </>
  );
};
