import { FormControl as MuiFormControl, styled } from '@mui/material';
import { ModalActions, ModalForm } from '@/common/ui/components';

export const Form = styled(ModalForm)({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  borderRadius: '10px',
  border: '1px solid #79747E',
});

export const FormControl = styled(MuiFormControl)({
  width: '100%',
  marginBottom: '18px',

  '&:last-of-type': {
    marginBottom: '0',
  },
});

export const Actions = styled(ModalActions)({
  justifyContent: 'flex-end',
  columnGap: '10px',
  marginTop: 'auto',
});
