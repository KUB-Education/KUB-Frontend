import { Route, Routes, Navigate } from 'react-router';
import { Home } from '../../../../home/ui/pages';
import AuthorizedLayout from '../AuthorizedLayout';
import { APP_ROUTES } from '../../../../coomon/routes.ts';

const AuthorizedMain = () => {
  return (
    <Routes>
      <Route element={<AuthorizedLayout />}>
        <Route path={APP_ROUTES.HOME} element={<Home />} />
        <Route path="*" element={<Navigate to={APP_ROUTES.HOME} />} />
      </Route>
    </Routes>
  );
};

export default AuthorizedMain;
