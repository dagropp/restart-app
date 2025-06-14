import VisibilityOffRounded from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRounded from '@mui/icons-material/VisibilityRounded';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material/TextField';
import { useState } from 'react';

export const PasswordInput = ({ type, ...props }: MuiTextFieldProps) => {
  const [innerType, setInnerType] = useState<MuiTextFieldProps['type']>(type);

  const toggleView = () =>
    setInnerType((prev) => (prev === 'text' ? 'password' : 'text'));

  return (
    <MuiTextField
      type={innerType}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={toggleView}
                edge="end"
                disabled={props.disabled}
              >
                {innerType === 'text' ? (
                  <VisibilityOffRounded />
                ) : (
                  <VisibilityRounded />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};
