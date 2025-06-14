import MuiTypography, {
  TypographyProps as MuiTypographyProps,
} from '@mui/material/Typography';

const Typography = ({ ...props }: MuiTypographyProps) => {
  return <MuiTypography {...props} />;
};

export default Typography;
