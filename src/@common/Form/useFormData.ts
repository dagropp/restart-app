import { useForm } from 'react-hook-form';

export const useFormData = <T extends object>() => {
  const { getValues, setValue, ...rest } = useForm();

  return {
    getValues: (key: keyof T) => getValues(key as string),
    setValue: (key: keyof T, value: unknown) => setValue(key as string, value),
    ...rest,
  };
};
