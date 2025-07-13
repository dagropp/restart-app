import Button from '@common/Button';
import Typography from '@common/Typography';
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';
import { useTranslations, useTranslationsContext } from '@translations';

const InvalidState = () => {
  const translations = useTranslations();
  const compTranslations = useTranslations().settings.signUp.stateInvalid;
  const { isRtl } = useTranslationsContext();

  return (
    <div className="flex flex-col gap-2 w-full items-center text-center">
      <Typography variant="h6">{compTranslations.title}</Typography>
      <SentimentVeryDissatisfiedRoundedIcon
        fontSize="large"
        className="mt-5 mb-5"
      />
      <Button link="/">{translations.user.login.action}</Button>
      <Typography
        variant="caption"
        className="text-balance"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {compTranslations.description}
      </Typography>
    </div>
  );
};

export default InvalidState;
