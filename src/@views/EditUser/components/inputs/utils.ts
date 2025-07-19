import { type FormEvent } from 'react';

import { GroupInputName, type SignUpData } from '../../types';
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

export const handleStepperSubmit =
  (callback: (payload: SignUpData) => Promise<void>) =>
  (data: Partial<Record<'user' | 'partner' | 'group', FormData>>) => {
    if (!data.user || !data.group) throw new Error();

    const user = Object.fromEntries(data.user) as Record<string, unknown>;
    const group = Object.fromEntries(data.group) as Record<string, unknown>;
    const partner =
      data.partner &&
      (Object.fromEntries(data.partner) as Record<string, unknown>);

    group[GroupInputName.Children] = parseChildren(
      data.group.getAll(GroupInputName.Children),
    );

    const payload = partner
      ? { ...partner, ...user, ...group }
      : { ...user, ...group };

    return callback(payload as unknown as SignUpData);
  };
