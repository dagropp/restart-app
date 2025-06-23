import Switch from '@common/Switch';
import { useAppContext } from '@context/app';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { ThemeType } from '@root/types';
import storageService from '@services/storage';
import clsx from 'clsx';

export const ThemeSwitch = () => {
  const { theme, setTheme } = useAppContext();
  const isLight = theme === ThemeType.Light;

  const handleChange = (value: boolean) => {
    const update = value ? ThemeType.Light : ThemeType.Dark;
    storageService.set('theme', update);
    setTheme(update);
  };

  const iconClass =
    'absolute top-[10px] pointer-events-none !transition-transform !transition-fill';
  const selectedClass = (selected: boolean) =>
    selected ? 'scale-[0.8]' : 'scale-[0.7]';

  return (
    <div className="relative">
      <Switch onChange={handleChange} checked={isLight} color="default" />
      <LightModeRoundedIcon
        fontSize="small"
        className={clsx(iconClass, selectedClass(isLight), 'right-[10px]')}
        sx={{ color: (theme) => theme.palette.text.primary }}
      />
      <DarkModeRoundedIcon
        fontSize="small"
        className={clsx(iconClass, selectedClass(!isLight), 'left-[10px]')}
        sx={{ color: (theme) => theme.palette.primary.contrastText }}
      />
    </div>
  );
};
