import Dialog from '@common/Dialog';
import Typography from '@common/Typography';
import { LoginState, useAppContext } from '@context/app';
import apiService from '@services/api';
import { useTranslations, useTranslationsContext } from '@translations';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const SuccessDialog = ({ open, onClose }: Props) => {
  const translations = useTranslations().settings.signUp.successDialog;
  const { isRtl } = useTranslationsContext();
  const { setIsLoggedIn } = useAppContext();
  const { refetch: refetchCities } = apiService.useCities();

  const handleDone = async () => {
    onClose();
    setIsLoggedIn(LoginState.Valid);
    await refetchCities();
  };

  const dir = isRtl ? 'rtl' : 'ltr';

  return (
    <Dialog
      onClose={handleDone}
      open={open}
      title={translations.title}
      className="text-center"
      dir={dir}
      success={{ onAction: handleDone, label: translations.action }}
      actionsClassName="!justify-center mb-4"
      slotProps={{ backdrop: { className: 'backdrop-blur-sm' } }}
    >
      <div className="flex flex-col gap-4 w-[200px]">
        <Typography>{translations.description}</Typography>
        <span className="text-[50px]">🎊</span>
      </div>
    </Dialog>
  );
};
