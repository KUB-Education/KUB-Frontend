import { AppBar } from './styled.ts';
import Logo, { LogoProps } from '../Logo';
import { ReactNode } from 'react';

export type HeaderProps = Partial<{
  className: string;
  children: ReactNode;
  prepend: ReactNode;
  logoProps: LogoProps;
}>;

const Header = ({
  className,
  children,
  prepend,
  logoProps = {},
}: HeaderProps) => {
  return (
    <AppBar position="fixed" className={className}>
      {prepend}
      <Logo {...logoProps} />
      {children}
    </AppBar>
  );
};

export default Header;
