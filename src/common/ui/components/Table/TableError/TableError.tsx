import { Root, Title, Content, IconWrapper } from './styles.tsx';
import WarningIcon from '@/common/assets/icons/warning.svg?react';

const TableError = () => {
  return (
    <Root>
      <Content>
        <IconWrapper>
          <WarningIcon width={24} height={24} />
        </IconWrapper>
        <Title>Something went wrong</Title>
      </Content>
    </Root>
  );
};

export default TableError;
