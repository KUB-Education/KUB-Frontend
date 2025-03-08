import React from 'react';
// eslint-disable-next-line import/no-unresolved
import MenuIcon from 'src/coomon/assets/icons/menu.svg?react';
import Drawer from '../../../../coomon/ui/components/Drawer';
import {
  Content,
  Root,
  MenuButton,
  Header,
  HeaderContent,
  HeaderLabel,
  HeaderToolbar,
} from './styles.tsx';
import { Outlet } from 'react-router';

const AuthorizedLayout = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen((val) => !val);
  };

  return (
    <Root>
      <Header
        prepend={
          <MenuButton
            disableRipple
            aria-label="open drawer"
            onClick={toggleDrawer}
            open={open}
          >
            <MenuIcon />
          </MenuButton>
        }
      >
        <HeaderContent>
          <HeaderLabel>Admin</HeaderLabel>
          <HeaderToolbar />
        </HeaderContent>
      </Header>
      <Drawer open={open} />
      <Content>
        <Outlet />
      </Content>
    </Root>
  );
};

export default AuthorizedLayout;
