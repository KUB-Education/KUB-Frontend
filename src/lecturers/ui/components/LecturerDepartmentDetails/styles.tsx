import { styled } from '@mui/material';
import {
  ModalTitle,
  ModalBody,
  ModalActions,
  ModalForm,
  FormControl as CommonFormControl,
  DeleteButton as CommonDeleteButton,
} from '@/common/ui/components';

export const Content = styled(ModalBody)({
  width: '460px',
  maxWidth: '96vw',
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
  marginTop: '24px',
  gap: '18px',
});

export const DeleteButton = styled(CommonDeleteButton)({
  marginLeft: 'auto',
});
