import Typography from '@common/Typography';
import CompareRoundedIcon from '@mui/icons-material/CompareRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import IconButton from '@mui/material/IconButton';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useTheme } from '@mui/material/styles';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { Link as RouterLink, useLocation } from 'react-router';

interface NavigationButton {
  Icon: OverridableComponent<SvgIconTypeMap>;
  label: string;
  path: string;
  getIsActive?: (path?: string) => boolean;
}

const buttons: NavigationButton[] = [
  {
    Icon: LocationCityRoundedIcon,
    label: 'Cities',
    path: '/',
    getIsActive: (path?: string) => path === '/' || !!path?.startsWith('/city'),
  },
  {
    Icon: FlagRoundedIcon,
    label: 'Countries',
    path: '/countries',
  },
  {
    Icon: CompareRoundedIcon,
    label: 'Compare',
    path: '/compare',
  },
  {
    Icon: DashboardRoundedIcon,
    label: 'Notes',
    path: '/notes',
  },
  {
    Icon: Diversity3RoundedIcon,
    label: 'Group',
    path: '/group',
  },
  {
    Icon: SettingsRoundedIcon,
    label: 'Settings',
    path: '/settings/user',
  },
];

export const ToolbarNavigation = () => {
  const { pathname } = useLocation();
  const theme = useTheme();

  const buttonStyle = {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.text.primary
        : theme.palette.primary.contrastText,
  };

  const getActiveColor = (isActive: boolean) =>
    isActive ? { color: theme.palette.info.light } : { color: 'inherit' };

  return (
    <div className="flex flex-col gap-2 w-full pl-2 pr-5" style={buttonStyle}>
      {buttons.map(({ label, path, getIsActive, Icon }) => {
        const isActive = getIsActive
          ? getIsActive(pathname)
          : pathname?.startsWith(path);

        return (
          <RouterLink
            key={label}
            className="flex items-center cursor-pointer gap-2"
            to={path}
          >
            <IconButton
              color={isActive ? 'primary' : 'inherit'}
              style={getActiveColor(isActive)}
            >
              <Icon />
            </IconButton>
            <Typography
              variant="subtitle2"
              lineHeight="normal"
              style={getActiveColor(isActive)}
            >
              {label}
            </Typography>
          </RouterLink>
        );
      })}
    </div>
  );
};
