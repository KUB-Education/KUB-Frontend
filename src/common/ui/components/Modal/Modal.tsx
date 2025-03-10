import { ModalProps as MuiModalProps } from '@mui/material';
import { Root } from './styles';

export type ModalProps = MuiModalProps;

const Modal = ({ children, ...otherProps }: ModalProps) => {
  return <Root {...otherProps}>{children}</Root>;
};

export default Modal;
