import Select, { SelectOption } from '@common/Select';
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
import { useTranslations } from '@translations';
import { style } from '@utils/style.utils';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router';

interface NavigationButton {
  Icon: OverridableComponent<SvgIconTypeMap>;
  label: string;
  path: string;
  getIsActive?: (path?: string) => boolean;
}

const isLargeScreen = style.isMediaQuery('sm');

const getPathValue = (pathname: string) => {
  const root = pathname.split('/').at(1);
  return !root || root === 'city' ? '/' : `/${root}`;
};

export const ToolbarNavigation = () => {
  const { pathname } = useLocation();
  const translations = useTranslations().menu.primary;
  const navigate = useNavigate();
  const theme = useTheme();

  const buttons: NavigationButton[] = [
    {
      Icon: LocationCityRoundedIcon,
      label: translations.cities,
      path: '/',
      getIsActive: (path?: string) =>
        path === '/' || !!path?.startsWith('/city'),
    },
    {
      Icon: FlagRoundedIcon,
      label: translations.countries,
      path: '/countries',
    },
    {
      Icon: CompareRoundedIcon,
      label: translations.compare,
      path: '/compare',
    },
    {
      Icon: DashboardRoundedIcon,
      label: translations.notes,
      path: '/notes',
    },
    {
      Icon: Diversity3RoundedIcon,
      label: translations.group,
      path: '/group',
    },
    {
      Icon: SettingsRoundedIcon,
      label: translations.settings,
      path: '/settings',
    },
  ];

  const options: SelectOption<string>[] = buttons.map(
    ({ path, label, Icon }) => ({
      value: path,
      label: (
        <div className="flex items-center gap-2">
          <Icon fontSize="small" />
          {label}
        </div>
      ),
    }),
  );

  const buttonStyle = {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.text.primary
        : theme.palette.primary.contrastText,
  };

  const getActiveColor = (isActive: boolean) =>
    isActive ? { color: theme.palette.info.light } : { color: 'inherit' };

  return isLargeScreen ? (
    <div
      className="gap-2 w-full pl-2 pr-5 flex lg:flex-col"
      style={buttonStyle}
    >
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
  ) : (
    <div className="mx-3 w-full">
      <Select<string>
        options={options}
        value={getPathValue(pathname)}
        onChange={navigate}
        variant="standard"
        className="mb-4"
        classes={{
          select: '!text-white border-white !flex !justify-center',
          icon: '!text-white',
        }}
      />
    </div>
  );
};
