import TextField from '@common/TextField';
import { type TextFieldProps } from '@mui/material/TextField';

import { InputName } from '../../types';

const FirstNameInput = (props: TextFieldProps) => {
  return (
    <TextField
      name={InputName.FirstName}
      type="text"
      label="First name"
      variant="outlined"
      autoComplete="given-name"
      fullWidth
      {...props}
    />
  );
};

export default FirstNameInput;
