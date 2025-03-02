import { Route, Routes } from 'react-router';
import { Home } from '../../home/ui/pages';

const AuthorizedMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AuthorizedMain;
