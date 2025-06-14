import TextField from '@common/TextField';
import { type TextFieldProps } from '@mui/material/TextField';

import { InputName } from '../../types';

const LastNameInput = (props: TextFieldProps) => {
  return (
    <TextField
      name={InputName.LastName}
      type="text"
      label="Last name"
      variant="outlined"
      autoComplete="family-name"
      fullWidth
      {...props}
    />
  );
};

export default LastNameInput;
