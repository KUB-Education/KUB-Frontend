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
import { useState, MouseEvent } from 'react';

export type HeaderToolbarProps = {
  className?: string;
};

const HeaderToolbar = ({ className }: HeaderToolbarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Root className={className}>
      <UserName>Kilko Pavlo</UserName>
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
        <MenuItem onClick={handleClose}>
          <MenuItemIcon>
            <ProfileIcon />
          </MenuItemIcon>
          Profile settings
        </MenuItem>
        <LogoutMenuItem onClick={handleClose}>Logout</LogoutMenuItem>
      </Menu>
    </Root>
  );
};

export default HeaderToolbar;
