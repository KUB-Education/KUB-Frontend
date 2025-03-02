import { Root } from './styled.ts';
import Logo from '../Logo';

export type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  return (
    <Root className={className}>
      <Logo />
    </Root>
  );
};

export default Header;
