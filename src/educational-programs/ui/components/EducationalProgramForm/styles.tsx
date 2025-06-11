import { FormControl as MuiFormControl, styled } from '@mui/material';
import { ModalActions, ModalForm } from '@/common/ui/components';

export const Form = styled(ModalForm)({});

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
