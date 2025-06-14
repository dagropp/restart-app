import Tooltip from '@common/Tooltip';
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
import { UserInviteDialog } from '@shared/UserInviteDialog.tsx';
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

const INVITE_USER = 'Invite User';
const ADD_USER_TO_GROUP = 'Add User to Group';

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
  const { setIsLoggedIn, currency, setCurrency } = useAppContext();
  const { isAdmin, canSendGroupInvite } = useUserContext();

  const navigate = useNavigate();
  const { user } = useUserContext();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [inviteDialogState, setInviteDialogState] =
    useState<InviteDialogState>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const openInviteDialog = (isGroup: boolean) => () =>
    setInviteDialogState({ isGroup, isOpen: true });
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
        className="!w-max h-screen"
        elevation={0}
        sx={{ bgcolor: getBgColor }}
      >
        <Toolbar className="flex flex-col items-center mx-auto !py-4 !px-0 h-full !m-0 relative">
          <Logo />
          <ToolbarNavigation />
          <div className="self-start flex flex-col gap-2 items-center pl-2 mt-auto">
            <ThemeSwitch />
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
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
                {isAdmin && (
                  <MenuItemComponent
                    onClick={openInviteDialog(false)}
                    Icon={PersonAddAltRoundedIcon}
                  >
                    {INVITE_USER}
                  </MenuItemComponent>
                )}
                {canSendGroupInvite && (
                  <MenuItemComponent
                    onClick={openInviteDialog(true)}
                    Icon={GroupAddRoundedIcon}
                  >
                    {ADD_USER_TO_GROUP}
                  </MenuItemComponent>
                )}
                <MenuItemComponent onClick={logout} Icon={LogoutRoundedIcon}>
                  Logout
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
