import Switch, { SwitchProps } from '@common/Switch';
import { useFormContext } from 'react-hook-form';

interface Props<T extends object> extends Omit<SwitchProps, 'name'> {
  name: keyof T;
}

export const FormSwitch = <T extends object>({ name, ...props }: Props<T>) => {
  const { register, setValue } = useFormContext();
  const key = name as string;

  const handleChange = (value: boolean) => setValue(key, value);

  return <Switch {...register(key)} onChange={handleChange} {...props} />;
};
