import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Menu as MuiMenu, MenuItem as MuiMenuItem } from '@mui/material';
import UserAvatar from '../UserAvatar';

export const Root = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

export const UserName = styled('h5')({
  color: '#050315',
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 40,
});

export const Avatar = styled(UserAvatar)({
  marginLeft: 15,
});

export const SettingButton = styled(IconButton)({
  color: '#050315',
  marginLeft: 10,
});

export const Menu = styled(MuiMenu)({
  '& .MuiMenu-paper': {
    borderRadius: '15px',
    background: '#D1E8FF',
    marginTop: '10px',
    boxShadow: 'none',
  },
  '& .MuiMenu-list': {
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export const MenuItem = styled(MuiMenuItem)({
  display: 'flex',
  alignItems: 'center',
  color: '#001D36',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '20px',
  height: '40px',
});

export const LogoutMenuItem = styled(MenuItem)({
  justifyContent: 'flex-end',
});

export const MenuItemIcon = styled('div')({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  marginRight: 8,
});
