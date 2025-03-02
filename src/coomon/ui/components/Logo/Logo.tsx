// TODO update
// eslint-disable-next-line import/no-unresolved
import logo from 'src/coomon/assets/logo.svg';
import { HTMLAttributes } from 'react';

export type LogoProps = HTMLAttributes<HTMLImageElement>;

const Logo = (props: LogoProps) => {
  return <img src={logo} alt="logo" width={132} height={34} {...props} />;
};

export default Logo;
