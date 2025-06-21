import Rating from '@common/Rating';
import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import Divider from '@mui/material/Divider';
import apiService, { City, ScoreKey } from '@services/api';
import { useTranslations } from '@translations';
import { object } from '@utils/object.utils';
import clsx from 'clsx';

interface Props {
  city: City;
  averageHidden?: boolean;
  className?: string;
}

interface ScoreItemComponentProps {
  value: number;
  scoreKey: ScoreKey;
}

const ScoreItemComponent = ({ value, scoreKey }: ScoreItemComponentProps) => {
  const translations = useTranslations().enum.score[scoreKey];

  return (
    <>
      <Rating value={value} base={10} readOnly tooltip />
      <span className="flex items-center gap-1">
        <Typography variant="caption">{translations.label}</Typography>
        {translations.description && (
          <Tooltip
            title={
              <Typography variant="body2" className="py-1 px-2">
                {translations.description}
              </Typography>
            }
          >
            <InfoRoundedIcon fontSize="inherit" />
          </Tooltip>
        )}
      </span>
    </>
  );
};

const ScoreDisplay = ({ city, averageHidden, className }: Props) => {
  const { data: scores } = apiService.score.use();
  const { average, ...sections } = scores[city];

  return (
    <div
      className={clsx(
        'grid gap-2 grid-cols-[max-content_1fr] items-center',
        className,
      )}
    >
      {!averageHidden && (
        <>
          <ScoreItemComponent value={average} scoreKey="average" />
          <Divider className="col-span-2" />
        </>
      )}
      {object.entries(sections).map(([key, score]) => (
        <ScoreItemComponent key={key} value={score} scoreKey={key} />
      ))}
    </div>
  );
};

export default ScoreDisplay;
