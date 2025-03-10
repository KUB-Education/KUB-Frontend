import AuthorizedMain from '../AuthorizedMain';
import { useIsAuthorizedQuery } from '@/auth/hooks';
import UnauthorizedMain from '../UnauthorizedMain';

const Main = () => {
  const { isAuthorized } = useIsAuthorizedQuery();

  if (isAuthorized) {
    return <AuthorizedMain />;
  }

  return <UnauthorizedMain />;
};

export default Main;
