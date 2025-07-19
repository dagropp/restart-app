import Typography from '@common/Typography';
import { GroupResponse } from '@services/api';
import { useTranslations } from '@translations';
import clsx from 'clsx';

import classes from './edit-group-form.module.css';
import {
  ApartmentSelect,
  CreateChildrenList,
  DepartureDateInput,
  DestinationInput,
  ExistingChildInput,
  InputHelperWrapper,
} from './inputs';

interface Props {
  group?: GroupResponse;
}

export const EditGroupFormInputs = ({ group }: Props) => {
  const translations = useTranslations().settings.form;
  const isSignUp = !group;

  return (
    <div className="flex flex-col gap-4 w-full">
      <Typography variant="body1" fontWeight="500" align="center">
        {translations.children}
      </Typography>
      <div className={clsx('flex gap-4', classes.children)}>
        <InputHelperWrapper
          text={translations.helper.childrenInfo}
          show={isSignUp}
        >
          {group?.children?.map((child) => (
            <ExistingChildInput key={child.id} defaultValue={child} />
          ))}
          <CreateChildrenList hasChildren={!!group?.children.length} />
        </InputHelperWrapper>
      </div>
      <Typography variant="body1" fontWeight="500" align="center" mt={2}>
        {translations.preferences}
      </Typography>
      <DepartureDateInput defaultValue={group?.departureDate} />
      <InputHelperWrapper
        text={translations.helper.preferences}
        show={isSignUp}
      >
        <ApartmentSelect defaultValue={group?.bedrooms ?? 2} />
      </InputHelperWrapper>
      <InputHelperWrapper
        text={translations.helper.destination}
        show={isSignUp}
      >
        <DestinationInput defaultValue={group?.destination} />
      </InputHelperWrapper>
    </div>
  );
};
