import Button from '@common/Button';
import { GroupResponse } from '@services/api';
import { FormEvent } from 'react';

import { EditGroupFormInputs } from './EditGroupFormInputs';

interface Props {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitButton: { label: string; loading?: boolean };
  group?: GroupResponse;
}

export const EditGroupForm = ({ handleSubmit, submitButton, group }: Props) => (
  <form onSubmit={handleSubmit} className="pb-5">
    <EditGroupFormInputs group={group} />
    <Button
      variant="contained"
      size="large"
      type="submit"
      loading={submitButton.loading}
      fullWidth
      className="!mt-4"
    >
      {submitButton.label}
    </Button>
  </form>
);
