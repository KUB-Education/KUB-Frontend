import logo from '@/common/assets/logo.svg';
import { ImgHTMLAttributes } from 'react';
import { APP_ROUTES } from '../../../routes.ts';
import { Link } from './styles.tsx';

export type LogoProps = ImgHTMLAttributes<HTMLImageElement>;

const Logo = (props: LogoProps) => {
  return (
    <Link to={APP_ROUTES.HOME}>
      <img src={logo} alt="logo" width={132} height={34} {...props} />
    </Link>
  );
};

export default Logo;
