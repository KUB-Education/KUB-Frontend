import { styled } from '@mui/material';
import MuiListItemButton from '@mui/material/ListItemButton';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import MuiDrawer from '@mui/material/Drawer';
import type { CSSObject, Theme } from '@mui/material/styles';

const drawerWidth = 240;

export const Content = styled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 85,
  paddingBottom: 12,
  transition: theme.transitions.create('background-color', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: '#E9E9ED',
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: 89,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
});

export const Root = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  '& .MuiDrawer-paper': {
    borderRight: '1px solid #8C8C96',
  },
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));

export const List = styled('ul')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  paddingTop: 12,
});

export const ListItem = styled('li')({
  position: 'relative',
  width: '100%',
});

export const HelpListItem = styled(ListItem)({
  marginTop: 'auto',
});

export const ListItemButton = styled(MuiListItemButton)({
  display: 'flex',
  alignItems: 'center',
  minHeight: 40,
  paddingLeft: 35,
});

export const ListItemIcon = styled(MuiListItemIcon)({
  minWidth: 0,
  justifyContent: 'center',
  marginRight: 8,
});

export const ListItemText = styled('span', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ open }) => ({
  opacity: open ? 1 : 0,
  flex: '1 1 auto',
  minWidth: 0,
  lineHeight: '20px',
  fontSize: 14,
  color: '#050315',
}));
