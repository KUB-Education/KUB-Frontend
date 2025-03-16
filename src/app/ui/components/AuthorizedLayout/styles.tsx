import { styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {
  Header as CommonHeader,
  HeaderToolbar as CommonHeaderToolbar,
} from '@/common/ui/components';

export const Root = styled('div')({
  display: 'flex',
  paddingTop: 85,
  height: '100vh',
});

export const Content = styled('main')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

export const MenuButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ open }) => ({
  backgroundColor: open ? '#3BB3FF' : '#F4EFF4',
  color: open ? '#F4EFF4' : '#050315',
  marginRight: 20,
  flexShrink: 0,
}));

export const Header = styled(CommonHeader)({});

export const HeaderContent = styled('div')({
  display: 'flex',
  flexGrow: 1,
  marginLeft: 20,
});

export const HeaderLabel = styled('h3')({
  fontSize: 24,
  fontWeight: 400,
  lineHeight: '40px',
});

export const HeaderToolbar = styled(CommonHeaderToolbar)({
  marginLeft: 'auto',
});
