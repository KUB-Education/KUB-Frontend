import { styled } from '@mui/material/styles';
import UserAvatar from '../../../../app/ui/components/UserAvatar';
import IconButton from '@mui/material/IconButton';

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
