import { Outlet } from 'react-router';
import { Content, Root, Header } from './styles.tsx';

const UnauthorizedLayout = () => {
  return (
    <Root>
      <Header logoProps={{ width: '320px', height: '80px' }} />
      <Content>
        <Outlet />
      </Content>
    </Root>
  );
};

export default UnauthorizedLayout;
