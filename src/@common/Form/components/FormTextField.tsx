import TextField from '@common/TextField';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { useFormContext } from 'react-hook-form';

type Props<T extends object> = Omit<MuiTextFieldProps, 'name'> & {
  name: keyof T;
};

export const FormTextField = <T extends object>({
  name,
  ...props
}: Props<T>) => {
  const { register } = useFormContext();

  return <TextField {...register(name as string)} {...props} />;
};
