import Button from '@common/Button';
import Typography from '@common/Typography';
import { type UserResponse } from '@services/api';
import LanguageSelect from '@shared/LanguageSelect';
import { useTranslationsContext } from '@translations';

import { type SignUpData } from '../types';
import { EditUserFormInputs } from './EditUserFormInputs';
import { handleFormSubmit } from './inputs';

interface Props {
  user?: UserResponse;
  email?: string;
  onSubmit: (data: SignUpData) => Promise<void>;
  submitButton: { label: string; loading?: boolean };
  title?: string;
  subtitle?: string;
}

const EditUserForm = ({
  user,
  email,
  onSubmit,
  submitButton,
  title,
  subtitle,
}: Props) => {
  const { isRtl } = useTranslationsContext();
  const isSignUp = !user;

  const handleSubmit = handleFormSubmit<SignUpData>(onSubmit);

  return (
    <>
      {(title || subtitle) && (
        <div className="text-center" dir={isRtl ? 'rtl' : 'ltr'}>
          {title && <Typography variant="h6">{title}</Typography>}
          {subtitle && (
            <Typography variant="body2" className="pb-5">
              {subtitle}
            </Typography>
          )}
        </div>
      )}

      {isSignUp && (
        <div className="pt-4 pb-6 w-full sm:w-1/2">
          <LanguageSelect />
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full pb-5">
        <EditUserFormInputs
          user={user}
          isSignUp={isSignUp}
          email={email}
          type="user"
        />
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
