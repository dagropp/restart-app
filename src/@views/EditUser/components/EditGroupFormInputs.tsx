import Typography from '@common/Typography';
import { GroupResponse } from '@services/api';
import clsx from 'clsx';

import classes from './edit-group-form.module.css';
import {
  ApartmentSelect,
  CreateChildrenList,
  DepartureDateInput,
  ExistingChildInput,
} from './inputs';

interface Props {
  group?: GroupResponse;
}

export const EditGroupFormInputs = ({ group }: Props) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className={clsx('flex gap-4', classes.children)}>
        <Typography variant="button">Children</Typography>
        {group?.children?.map((child) => (
          <ExistingChildInput key={child.id} defaultValue={child} />
        ))}
        <CreateChildrenList />
      </div>
      <Typography variant="button" className="pb-2">
        Preferences
      </Typography>
      <DepartureDateInput defaultValue={group?.departureDate} />
      <ApartmentSelect defaultValue={group?.bedrooms} />
    </div>
  );
};
