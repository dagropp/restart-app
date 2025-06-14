import { CircularProgress } from '@mui/material';

import Typography from '../Typography';
import { type ProgressDisplayProps } from './types';

const ProgressDisplay = ({ size = 28, progress }: ProgressDisplayProps) => {
  return (
    <div
      className="relative"
      style={{ width: size, height: size, fontSize: `${size}px` }}
    >
      <CircularProgress variant="determinate" value={progress} size={size} />
      <Typography
        variant="inherit"
        className="absolute inset-0 flex items-center justify-center scale-[0.37]"
      >
        {progress}%
      </Typography>
    </div>
  );
};

export default ProgressDisplay;
