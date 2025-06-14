import Tooltip, { type TooltipProps } from '@common/Tooltip';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { alpha } from '@mui/material/styles';
import { SvgIconOwnProps } from '@mui/material/SvgIcon';
import clsx from 'clsx';

interface InfoTooltipProps extends Omit<TooltipProps, 'children'> {
  fontSize?: SvgIconOwnProps['fontSize'];
  iconClassName?: string;
}

const InfoTooltip = ({
  fontSize = 'inherit',
  iconClassName,
  ...props
}: InfoTooltipProps) => {
  return (
    <Tooltip {...props}>
      <InfoRoundedIcon
        fontSize={fontSize}
        className={clsx('transition-colors', iconClassName)}
        sx={(theme) => ({
          color: theme.palette.text.secondary,
          ':hover': {
            color: alpha(theme.palette.action.selected, 0.4),
          },
        })}
      />
    </Tooltip>
  );
};

export default InfoTooltip;
