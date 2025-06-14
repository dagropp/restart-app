import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { SvgIconTypeMap } from '@mui/material/SvgIcon';
import clsx from 'clsx';

interface Props {
  Icon?: OverridableComponent<SvgIconTypeMap>;
  label: string;
  caption?: string;
  formattedValue: string;
  convertedValue: string;
}

export const PriceItem = ({
  Icon,
  label,
  caption,
  formattedValue,
  convertedValue,
}: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {Icon && <Icon fontSize="small" />}
        <Typography
          variant="body2"
          lineHeight="normal"
          className={clsx('flex items-center gap-1', !Icon && 'pl-7')}
        >
          {label}
          {caption && (
            <Typography
              variant="caption"
              lineHeight="normal"
              className="self-end scale-90"
            >
              {caption}
            </Typography>
          )}
        </Typography>
      </div>
      <Tooltip title={formattedValue} placement="left">
        <Typography variant="body2" className="flex items-start gap-2">
          {convertedValue}
        </Typography>
      </Tooltip>
    </div>
  );
};
