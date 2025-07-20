import Stepper from '@common/Stepper';
import Typography from '@common/Typography';
import LanguageSelect from '@shared/LanguageSelect';
import { useTranslations, useTranslationsContext } from '@translations';

import { EditGroupFormInputs, EditUserFormInputs } from './components';
import { handleStepperSubmit } from './components/inputs';
import { type SignUpData } from './types';

interface Props {
  email: string;
  onSubmit: (data: SignUpData) => Promise<void>;
}

export const CreateNewUser = ({ email, onSubmit }: Props) => {
  const translations = useTranslations().settings.signUp;
  const { isRtl } = useTranslationsContext();

  const handleSubmit = handleStepperSubmit(onSubmit);

  return (
    <>
      <div className="text-center" dir={isRtl ? 'rtl' : 'ltr'}>
        <Typography variant="h6">{translations.welcome}</Typography>
        <Typography variant="body2" className="pb-5">
          {translations.description}
        </Typography>
      </div>
      <div className="pt-4 pb-6 w-full sm:w-1/2">
        <LanguageSelect />
      </div>
      <Stepper
        onFinish={handleSubmit}
        childrenClassName="flex flex-col gap-4 w-full py-5"
        className="w-full"
        steps={[
          {
            key: 'user',
            label: translations.addUserDetails,
            element: (
              <EditUserFormInputs isSignUp={true} email={email} type="user" />
            ),
          },
          {
            key: 'partner',
            label: translations.addPartner,
            optional: true,
            element: (
              <EditUserFormInputs
                isSignUp={true}
                email={email}
                type="partner"
              />
            ),
          },
          {
            key: 'group',
            label: translations.addGroupDetails,
            element: <EditGroupFormInputs />,
          },
        ]}
      />
    </>
  );
};
