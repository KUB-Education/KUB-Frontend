import { FormControl as MuiFormControl, styled } from '@mui/material';
import { ModalTitle, ModalBody, ModalActions } from '@/common/ui/components';

export const Content = styled(ModalBody)({
  maxWidth: '460px',
});

export const Title = styled(ModalTitle)({
  marginBottom: '16px',
});

export const Form = styled('form')({});

export const FormControl = styled(MuiFormControl)({
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
