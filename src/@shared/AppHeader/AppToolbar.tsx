import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import { LoginState, useAppContext } from '@context/app';
import { useUserContext } from '@context/user';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem, { type MenuItemProps } from '@mui/material/MenuItem';
import { type OverridableComponent } from '@mui/material/OverridableComponent';
import { type SvgIconTypeMap } from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';
import apiService from '@services/api';
import storageService from '@services/storage';
import { UserInviteDialog } from '@shared/UserInviteDialog';
import { useTranslations } from '@translations';
import clsx from 'clsx';
import { type MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router';

import CurrencySelect from '../CurrencySelect';
import UserAvatar from '../UserAvatar';
import { Logo, ThemeSwitch, ToolbarNavigation } from './components';
import { getBgColor } from './utils';

interface MenuItemComponentProps extends MenuItemProps {
  Icon: OverridableComponent<SvgIconTypeMap>;
  href?: string;
}

type InviteDialogState = {
  isGroup: boolean;
  isOpen: boolean;
} | null;

const MenuItemComponent = ({
  Icon,
  className,
  children,
  ...props
}: MenuItemComponentProps) => (
  <MenuItem
    className={clsx('h-12 flex items-center gap-2', className)}
    {...props}
  >
    <Icon fontSize="small" />
    {children}
  </MenuItem>
);

const AppToolbar = () => {
  const { setIsLoggedIn, currency, setCurrency, theme } = useAppContext();
  const { isAdmin, canSendGroupInvite } = useUserContext();
  const translations = useTranslations().menu.secondary;

  const navigate = useNavigate();
  const { user } = useUserContext();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [inviteDialogState, setInviteDialogState] =
    useState<InviteDialogState>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const openInviteDialog = (isGroup: boolean) => () => {
    handleCloseUserMenu();
    setInviteDialogState({ isGroup, isOpen: true });
  };
  const closeInviteDialog = () => setInviteDialogState(null);

  const logout = async () => {
    const isValid = await apiService.authentication.logout();
    if (isValid) {
      storageService.reset('user');
      setIsLoggedIn(LoginState.Invalid);
      navigate('/');
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        className="lg:!w-max lg:h-screen h-16"
        elevation={0}
        sx={{ bgcolor: getBgColor }}
      >
        <Toolbar className="flex items-center mx-auto !m-0 relative lg:h-full lg:flex-col lg:!py-4 lg:!px-0">
          <Logo />
          <ToolbarNavigation />
          <div className="flex gap-2 items-center ml-auto pl-2 lg:ml-0 lg:mt-auto lg:self-start lg:flex-col">
            <div className="hidden lg:block">
              <ThemeSwitch />
            </div>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={translations.openSettings}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <UserAvatar
                    avatar={user.avatar}
                    firstName={user.firstName}
                    lastName={user.lastName}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                classes={{ paper: 'w-[215px]' }}
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 48, horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={!!anchorElUser}
                onClose={handleCloseUserMenu}
              >
                <div className="px-2 pb-2">
                  <CurrencySelect
                    value={currency}
                    onChange={setCurrency}
                    size="small"
                  />
                </div>
                <div className="px-1 pb-2 items-center h-12 flex lg:hidden">
                  <ThemeSwitch />
                  <Typography>
                    {theme === 'Light'
                      ? translations.lightTheme
                      : translations.darkTheme}
                  </Typography>
                </div>
                {isAdmin && (
                  <MenuItemComponent
                    onClick={openInviteDialog(false)}
                    Icon={PersonAddAltRoundedIcon}
                  >
                    {translations.inviteUser}
                  </MenuItemComponent>
                )}
                {canSendGroupInvite && (
                  <MenuItemComponent
                    onClick={openInviteDialog(true)}
                    Icon={GroupAddRoundedIcon}
                  >
                    {translations.addUserToGroup}
                  </MenuItemComponent>
                )}
                <MenuItemComponent onClick={logout} Icon={LogoutRoundedIcon}>
                  {translations.logout}
                </MenuItemComponent>
              </Menu>
            </Box>
          </div>
        </Toolbar>
      </AppBar>

      {(isAdmin || canSendGroupInvite) && (
        <UserInviteDialog
          open={!!inviteDialogState?.isOpen}
          onClose={closeInviteDialog}
          isGroupInvite={inviteDialogState?.isGroup}
        />
      )}
    </>
  );
};

export default AppToolbar;
