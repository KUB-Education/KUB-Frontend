import { useState } from 'react';
import MenuIcon from '@/common/assets/icons/menu.svg?react';
import { Drawer, Modal } from '@/common/ui/components';
import {
  Content,
  Root,
  MenuButton,
  Header,
  HeaderContent,
  HeaderLabel,
  HeaderToolbar,
} from './styles.tsx';
import { Outlet, useNavigate } from 'react-router';
import Breadcrumb from './Breadcrumb/Breadcrumb.tsx';
import { useLogout } from '@/auth/hooks';
import { useCurrentUserQuery } from '@/current-user/hooks';
import { UserProfileSettings } from '@/users/ui/components';
import { APP_ROUTES } from '@/common/routes.ts';

const AuthorizedLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);

  const navigate = useNavigate();
  const { logout } = useLogout();
  const { currentUser, isPending } = useCurrentUserQuery();

  const toggleDrawer = () => {
    setIsDrawerOpen((val) => !val);
  };

  const onChangePassword = () => {
    setIsProfileSettingsOpen(false);
    navigate(APP_ROUTES.CHANGE_PASSWORD);
  };

  return (
    <Root>
      <Header
        prepend={
          <MenuButton
            disableRipple
            aria-label="open drawer"
            onClick={toggleDrawer}
            open={isDrawerOpen}
          >
            <MenuIcon />
          </MenuButton>
        }
      >
        <HeaderContent>
          <HeaderLabel>
            <Breadcrumb />
          </HeaderLabel>
          <HeaderToolbar
            currentUser={currentUser}
            onLogout={logout}
            onSelectProfileSettings={() => setIsProfileSettingsOpen(true)}
          />
        </HeaderContent>
      </Header>
      <Drawer open={isDrawerOpen} />
      <Content>
        <Outlet />
      </Content>

      <Modal
        open={isProfileSettingsOpen}
        onClose={() => setIsProfileSettingsOpen(false)}
      >
        <UserProfileSettings
          currentUser={currentUser}
          isPending={isPending}
          onBack={() => setIsProfileSettingsOpen(false)}
          onChangePassword={onChangePassword}
        />
      </Modal>
    </Root>
  );
};

export default AuthorizedLayout;
