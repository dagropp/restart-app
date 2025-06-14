import Typography from '@common/Typography';
import { TypographyProps } from '@mui/material/Typography';
import { number } from '@utils/number.utils';

interface Props {
  balance: number;
}

const getColor = (balance: number): TypographyProps['color'] => {
  if (balance === 10) return 'success';
  if (balance >= (2 / 3) * 10) return 'info';
  if (balance >= (1 / 3) * 10) return 'warning';
  return 'error';
};

const BalanceDisplay = ({ balance }: Props) => (
  <Typography variant="inherit" color={getColor(balance)}>
    {number.percentage(balance, 10)} Positive
  </Typography>
);

export default BalanceDisplay;
