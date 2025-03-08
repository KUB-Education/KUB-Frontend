import { Root, UserName, Avatar, SettingButton } from './styles';
// eslint-disable-next-line import/no-unresolved
import SettingsIcon from '../../../assets/icons/settings.svg?react';

export type HeaderToolbarProps = {
  className?: string;
};

const HeaderToolbar = ({ className }: HeaderToolbarProps) => {
  return (
    <Root className={className}>
      <UserName>Kilko Pavlo</UserName>
      <Avatar />
      <SettingButton>
        <SettingsIcon />
      </SettingButton>
    </Root>
  );
};

export default HeaderToolbar;
