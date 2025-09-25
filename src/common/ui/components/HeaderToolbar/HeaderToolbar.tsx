import {
  Root,
  UserName,
  Avatar,
  SettingButton,
  Menu,
  MenuItem,
  MenuItemIcon,
  LogoutMenuItem,
} from './styles';
import SettingsIcon from '@/common/assets/icons/settings.svg?react';
import ProfileIcon from '@/common/assets/icons/profile.svg?react';
import { useState, MouseEvent, useMemo } from 'react';
import { CurrentUser } from '@/users/entities';

export type HeaderToolbarProps = {
  currentUser?: CurrentUser;
  className?: string;
  onSelectProfileSettings: () => void;
  onLogout: () => void;
};

const HeaderToolbar = ({
  currentUser,
  className,
  onLogout,
  onSelectProfileSettings,
}: HeaderToolbarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSelectProfile = () => {
    onSelectProfileSettings();
    setAnchorEl(null);
  };

  const onClickLogout = () => {
    onLogout();
    setAnchorEl(null);
  };

  const userName = useMemo(() => {
    if (!currentUser) return '';

    return `${currentUser.lastName} ${currentUser.firstName}`;
  }, [currentUser]);

  return (
    <Root className={className}>
      <UserName>{userName}</UserName>
      <Avatar />
      <SettingButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <SettingsIcon />
      </SettingButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={onSelectProfile}>
          <MenuItemIcon>
            <ProfileIcon />
          </MenuItemIcon>
          Profile settings
        </MenuItem>
        <LogoutMenuItem onClick={onClickLogout}>Logout</LogoutMenuItem>
      </Menu>
    </Root>
  );
};

export default HeaderToolbar;
