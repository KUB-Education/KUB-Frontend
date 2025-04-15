import { Root, Title, Content, IconWrapper } from './styles.tsx';
import WarningIcon from '@/common/assets/icons/warning.svg?react';

const AppError = () => {
  return (
    <Root>
      <Content>
        <IconWrapper>
          <WarningIcon width={35} height={35} />
        </IconWrapper>
        <Title>Something went wrong</Title>
      </Content>
    </Root>
  );
};

export default AppError;
