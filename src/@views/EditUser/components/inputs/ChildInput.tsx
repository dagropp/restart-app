import TextField from '@common/TextField';
import Tooltip from '@common/Tooltip';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';
import { DatePicker } from '@mui/x-date-pickers';
import { ChildrenPayload, ChildrenResponse } from '@services/api';
import dayjs, { Dayjs } from 'dayjs';
import { ChangeEvent, useState } from 'react';

import { GroupInputName } from '../../types';

interface BaseChild {
  name: string;
  dateOfBirth: string | null;
}

interface GenericChildInputProps<T extends BaseChild> {
  defaultValue: T;
  onDelete?: () => void;
  onChange?: (update: Partial<T>) => void;
}

interface ExistingChildInputProps {
  defaultValue: ChildrenResponse;
}

interface NewChildInputProps {
  defaultValue: ChildrenPayload;
  onChange: (update: Partial<ChildrenPayload>) => void;
  onDelete: () => void;
}

const GenericChildInput = <T extends BaseChild>({
  defaultValue,
  onDelete,
  onChange,
}: GenericChildInputProps<T>) => {
  const [name, setName] = useState(defaultValue.name);
  const [dateOfBirth, setDateOfBirth] = useState(
    defaultValue.dateOfBirth ? dayjs(defaultValue.dateOfBirth) : null,
  );
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    onDelete?.();
    setIsDeleted(true);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
    onChange?.({ name: value } as Partial<T>);
  };

  const handleDateChange = (update: Dayjs | null) => {
    setDateOfBirth(update);
    onChange?.({ dateOfBirth: update } as Partial<T>);
  };

  const isValid = !!name && !!dateOfBirth;

  const value = isValid && {
    ...defaultValue,
    name,
    dateOfBirth: dateOfBirth.format('YYYY-MM-DD'),
  };

  if (isDeleted) return null;

  return (
    <div className="flex items-center gap-4 w-full">
      <TextField
        placeholder="Name"
        label="Name"
        value={name}
        onChange={handleNameChange}
        className="w-full"
      />
      <DatePicker
        defaultValue={dateOfBirth}
        onChange={handleDateChange}
        label="Date of Birth"
        className="w-full"
      />

      <Tooltip title="Remove Child">
        <IconButton onClick={handleDelete}>
          <DeleteRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {value && (
        <input
          type="hidden"
          value={JSON.stringify(value)}
          name={GroupInputName.Children}
        />
      )}
    </div>
  );
};

export const NewChildInput = ({
  defaultValue,
  onChange,
  onDelete,
}: NewChildInputProps) => (
  <GenericChildInput
    defaultValue={defaultValue}
    onChange={onChange}
    onDelete={onDelete}
  />
);

export const ExistingChildInput = ({
  defaultValue,
}: ExistingChildInputProps) => (
  <GenericChildInput defaultValue={defaultValue} />
);
