import { Navigate, Route, Routes } from 'react-router';
import { APP_ROUTES } from '@/common/routes.ts';
import { ForgotPassword, Login } from '@/auth/ui/pages';
import UnauthorizedLayout from '../UnauthorizedLayout';

const UnauthorizedMain = () => {
  return (
    <Routes>
      <Route element={<UnauthorizedLayout />}>
        <Route path={APP_ROUTES.LOGIN} element={<Login />} />
        <Route path={APP_ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to={APP_ROUTES.LOGIN} />} />
      </Route>
    </Routes>
  );
};

export default UnauthorizedMain;
