import MuiTypography, {
  TypographyProps as MuiTypographyProps,
} from '@mui/material/Typography';
import { useTranslationsContext } from '@translations';

const Typography = ({ ...props }: MuiTypographyProps) => {
  const { isRtl } = useTranslationsContext();

  return (
    <MuiTypography dir={props.dir ?? (isRtl ? 'rtl' : 'ltr')} {...props} />
  );
};

export default Typography;
