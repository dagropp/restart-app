import { FormSwitch } from '@common/Form';
import Tooltip from '@common/Tooltip';
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import { type OverridableComponent } from '@mui/material/OverridableComponent';
import { type Theme } from '@mui/material/styles';
import { type SvgIconTypeMap } from '@mui/material/SvgIcon';
import { NoteScope } from '@root/types';
import { NoteData } from '@shared/Notes/components/NoteForm';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

interface IndicatorIconProps {
  checked: boolean;
  Icon: OverridableComponent<SvgIconTypeMap>;
  side: 'left' | 'right';
}

const getColor = (isChecked: boolean) => (theme: Theme) =>
  theme.palette.mode === 'dark'
    ? theme.palette.primary.contrastText
    : isChecked
      ? theme.palette.text.primary
      : theme.palette.primary.contrastText;

const IndicatorIcon = ({ Icon, checked, side }: IndicatorIconProps) => (
  <Icon
    fontSize="small"
    className={clsx(
      'absolute top-[10px] pointer-events-none !transition-transform !transition-fill',
      checked ? 'scale-[0.8]' : 'scale-[0.6]',
      side === 'left'
        ? checked
          ? 'left-[10px]'
          : 'left-[11px]'
        : checked
          ? 'right-[11px]'
          : 'right-[12px]',
    )}
    sx={{ color: getColor(checked) }}
  />
);

export const ScopeSwitch = () => {
  const { watch } = useFormContext<NoteData>();

  const scope = watch('scope') ?? true;

  return (
    <Tooltip title={scope ? NoteScope.Private : NoteScope.Public}>
      <div className="relative">
        <FormSwitch<NoteData> checked={scope} color="default" name="scope" />
        <IndicatorIcon side="right" Icon={HttpsRoundedIcon} checked={scope} />
        <IndicatorIcon side="left" Icon={PublicRoundedIcon} checked={!scope} />
      </div>
    </Tooltip>
  );
};
