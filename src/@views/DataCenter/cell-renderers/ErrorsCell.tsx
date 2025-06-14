import { TableCellRenderer } from '@common/Table';
import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { type TypographyProps } from '@mui/material/Typography';
import { ScrapingData } from '@services/api';

export const ErrorsCell = ({
  row: { errors },
}: TableCellRenderer<ScrapingData>) => {
  const color: TypographyProps['color'] = !errors.length
    ? 'success'
    : errors.length < 5
      ? 'warning'
      : 'error';

  const popover = errors.length ? (
    <div className="p-2 flex flex-col gap-2">
      {errors.map((item) => (
        <Typography variant="body2" key={item.id}>
          * {item.message ?? item.key}
        </Typography>
      ))}
    </div>
  ) : null;

  return (
    <Typography
      variant="inherit"
      color={color}
      className="flex items-center gap-1"
    >
      {!errors.length && 'None'}
      {errors.length === 1 && '1 Error'}
      {errors.length > 1 && `${errors.length} Errors`}
      {errors.length > 0 && (
        <Tooltip title={popover}>
          <InfoRoundedIcon fontSize="small" />
        </Tooltip>
      )}
    </Typography>
  );
};
