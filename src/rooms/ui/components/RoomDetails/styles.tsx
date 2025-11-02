import { styled } from '@mui/material';
import {
  ModalTitle,
  ModalBody,
  ModalActions,
  ModalForm,
  FormControl as CommonFormControl,
} from '@/common/ui/components';

export const Content = styled(ModalBody)({
  maxWidth: '460px',
});

export const Title = styled(ModalTitle)({
  marginBottom: '16px',
});

export const Form = styled(ModalForm)({});

export const FormControl = styled(CommonFormControl)({
  width: '100%',
  marginBottom: '18px',

  '&:last-of-type': {
    marginBottom: '0',
  },
});

export const Actions = styled(ModalActions)({
  justifyContent: 'space-between',
  marginTop: '24px',
});
