import { type FormEvent } from 'react';

import { GroupInputName } from '../../types';
import { parseChildren } from '../../utils';

export const handleFormSubmit =
  <T>(callback: (data: T) => void | Promise<void>) =>
  (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as T;
    data[GroupInputName.Children as keyof T] = parseChildren(
      formData.getAll(GroupInputName.Children),
    ) as T[keyof T];
    return callback(data);
  };
