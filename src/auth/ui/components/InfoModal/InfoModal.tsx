import { Modal } from '@/common/ui/components';
import {
  Actions,
  Content,
  Title,
  ContinueButton,
  DescriptionWrapper,
} from './styles';
import { ReactNode } from 'react';

type InfoModalProps = {
  title: ReactNode;
  children: ReactNode;
  open: boolean;
  onContinue?: () => void;
  onClose?: () => void;
};

const InfoModal = ({
  title,
  children,
  open,
  onContinue,
  onClose,
}: InfoModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>{title}</Title>
        <DescriptionWrapper>{children}</DescriptionWrapper>
        <Actions>
          <ContinueButton onClick={onContinue}>
            Continue
          </ContinueButton>
        </Actions>
      </Content>
    </Modal>
  );
};

export default InfoModal;
