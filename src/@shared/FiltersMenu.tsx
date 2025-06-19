import Button from '@common/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import Menu from '@mui/material/Menu';
import { useTranslations } from '@translations';
import { type ReactNode, useState } from 'react';

interface Props {
  isFiltered: boolean;
  reset: () => void;
  children: ReactNode;
}

const FiltersMenu = ({ isFiltered, children, reset }: Props) => {
  const translations = useTranslations().table.filters;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <div className="flex gap-4">
      <Button
        onClick={(event) => setAnchorEl(event.currentTarget)}
        endIcon={isFiltered ? <FilterAltRoundedIcon /> : <AddRoundedIcon />}
        variant="contained"
      >
        {isFiltered ? translations.editFilters : translations.addFilters}
      </Button>
      {isFiltered && (
        <Button
          variant="outlined"
          onClick={reset}
          endIcon={<ReplayRoundedIcon />}
        >
          {translations.resetFilters}
        </Button>
      )}
      <Menu
        classes={{ paper: 'w-[300px]' }}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 48, horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!anchorEl}
        onClose={handleCloseMenu}
      >
        {children}
      </Menu>
    </div>
  );
};

export default FiltersMenu;
