import AuthorizedMain from '../AuthorizedMain';
import { useIsAuthorized } from '../../../../auth/hooks';
import UnauthorizedMain from '../UnauthorizedMain';

const Main = () => {
  const { isAuthorized } = useIsAuthorized();

  if (isAuthorized) {
    return <AuthorizedMain />;
  }

  return <UnauthorizedMain />;
};

export default Main;
