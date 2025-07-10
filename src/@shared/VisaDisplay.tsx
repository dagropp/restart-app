import Tooltip from '@common/Tooltip';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { VisaLevel } from '@root/types';
import { useTranslations } from '@translations';

type DisplayType = 'short' | 'regular';

interface Props {
  level: VisaLevel;
  description?: string;
  type: DisplayType;
}

const VisaDisplay = ({ level, description, type }: Props) => {
  const translations = useTranslations().enum.visa;

  return (
    <div className="flex items-center gap-1">
      <span>{translations[level][type]}</span>
      {description && (
        <Tooltip title={description}>
          <InfoRoundedIcon color="disabled" fontSize="small" />
        </Tooltip>
      )}
    </div>
  );
};

export default VisaDisplay;
