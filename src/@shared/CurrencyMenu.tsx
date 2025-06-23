import Tooltip from '@common/Tooltip';
import { alpha, Theme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Currency } from '@root/types';
import currencyService from '@services/currency';
import { type MouseEvent, useState } from 'react';

import CurrencyDisplay from './CurrencyDisplay';

interface Props {
  value: Currency;
  onChange: (value: Currency) => void;
}

const selectedBg = (theme: Theme) =>
  alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity);

export const CurrencyMenu = ({ value, onChange }: Props) => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  const openMenu = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorElement(event.currentTarget);

  const closeMenu = () => setAnchorElement(null);

  const onMenuClick = (update: Currency) => () => {
    onChange(update);
    closeMenu();
  };

  const { symbol, name } = currencyService.map[value];

  return (
    <>
      <Tooltip title={name}>
        <IconButton onClick={openMenu} sx={{ p: 0 }} size="small">
          <span className="rounded-full p-2 min-w-8.5">{symbol}</span>
        </IconButton>
      </Tooltip>
      <Menu
        open={!!anchorElement}
        anchorEl={anchorElement}
        anchorOrigin={{ vertical: 48, horizontal: 'left' }}
        transformOrigin={{ vertical: 'center', horizontal: 'left' }}
        onClose={closeMenu}
      >
        {currencyService.list.map((currency) => (
          <MenuItem
            key={currency}
            onClick={onMenuClick(currency)}
            sx={value === currency ? { bgcolor: selectedBg } : {}}
          >
            <CurrencyDisplay currency={currency} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
