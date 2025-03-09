import { useState } from 'react';
import MenuIcon from '@/common/assets/icons/menu.svg?react';
import Drawer from '@/common/ui/components/Drawer';
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
  const [open, setOpen] = useState(false);

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
