import MuiButton from '@mui/material/Button';
import { Link } from 'react-router';

import { ButtonProps } from './types';

const Button = ({ link, children, ...props }: ButtonProps) => {
  return link ? (
    <MuiButton component={Link} to={link} {...props}>
      {children}
    </MuiButton>
  ) : (
    <MuiButton {...props}>{children}</MuiButton>
  );
};

export default Button;
