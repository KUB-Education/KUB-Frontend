import Modal from '@/common/ui/components/Modal';
import {
  Actions,
  Content,
  Title,
  ContinueButton,
  DescriptionWrapper,
} from './styles';
import { ReactNode } from 'react';

type ErrorModalProps = {
  children: ReactNode;
  open: boolean;
  onContinue?: () => void;
  onClose?: () => void;
};

const ErrorModal = ({
  children,
  open,
  onContinue,
  onClose,
}: ErrorModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>Error</Title>
        <DescriptionWrapper>{children}</DescriptionWrapper>
        <Actions>
          <ContinueButton color="error" onClick={onContinue}>
            Continue
          </ContinueButton>
        </Actions>
      </Content>
    </Modal>
  );
};

export default ErrorModal;
