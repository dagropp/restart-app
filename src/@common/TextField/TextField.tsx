import MuiTextField from '@mui/material/TextField';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import clsx from 'clsx';

import { PasswordInput } from './components';
import classes from './styles.module.css';

const TextField = ({ type, ...props }: MuiTextFieldProps) => {
  switch (type) {
    case 'password':
      return <PasswordInput type={type} {...props} />;
    default:
      return (
        <MuiTextField
          type={type}
          className={clsx(classes.component, props.className)}
          {...props}
        />
      );
  }
};

export default TextField;
