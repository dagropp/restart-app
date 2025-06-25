import { useTheme } from '@mui/material/styles';
import { SparkLineChart as MuiSparkLineChart } from '@mui/x-charts';

import { skeletonChart } from './constants';
import { type SparkLineChartProps } from './types';

const SparkLineChart = ({
  isLoading,
  data,
  showTooltip,
  showHighlight,
  color,
  ...props
}: SparkLineChartProps) => {
  const theme = useTheme();

  return (
    <MuiSparkLineChart
      data={isLoading ? skeletonChart : data}
      color={isLoading ? theme.palette.action.focus : color}
      showTooltip={isLoading ? false : showTooltip}
      showHighlight={isLoading ? false : showHighlight}
      {...props}
    />
  );
};

export default SparkLineChart;
