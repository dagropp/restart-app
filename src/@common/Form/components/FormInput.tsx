import { HTMLProps } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props<T extends object>
  extends Omit<HTMLProps<HTMLInputElement>, 'name'> {
  name: keyof T;
}

export const FormInput = <T extends object>({ name, ...props }: Props<T>) => {
  const { register } = useFormContext();

  return <input {...register(name as string)} {...props} />;
};
