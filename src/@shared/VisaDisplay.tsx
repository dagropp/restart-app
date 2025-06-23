import Tooltip from '@common/Tooltip';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { VisaLevel } from '@root/types';

type DisplayType = 'short' | 'regular';

interface Props {
  level: VisaLevel;
  description?: string;
  type: DisplayType;
}

const visaLevelMap: Record<VisaLevel, Record<DisplayType, string>> = {
  [VisaLevel.None]: { short: 'Not Required', regular: 'No visa required' },
  [VisaLevel.Easy]: { short: 'Easy', regular: 'Easy visa requirements' },
  [VisaLevel.Medium]: { short: 'Medium', regular: 'Medium visa requirements' },
};

const VisaDisplay = ({ level, description, type }: Props) => (
  <div className="flex items-center gap-1">
    <span>{visaLevelMap[level][type]}</span>
    {description && (
      <Tooltip title={description}>
        <InfoRoundedIcon color="disabled" fontSize="small" />
      </Tooltip>
    )}
  </div>
);

export default VisaDisplay;
