import { AppBar } from './styled.ts';
import Logo from '../Logo';

export type HeaderProps = {
  className?: string;
  children?: React.ReactNode;
  prepend?: React.ReactNode;
};

const Header = ({ className, children, prepend }: HeaderProps) => {
  return (
    <AppBar position="fixed" className={className}>
      {prepend}
      <Logo />
      {children}
    </AppBar>
  );
};

export default Header;
