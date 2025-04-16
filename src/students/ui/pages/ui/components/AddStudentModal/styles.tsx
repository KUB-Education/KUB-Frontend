import { FormControl as MuiFormControl, styled } from '@mui/material';
import {
  ModalTitle,
  ModalBody,
  ModalActions,
  ModalForm,
  ModalFormCol,
  ModalFormRow,
} from '@/common/ui/components';

export const Content = styled(ModalBody)({
  width: '920px',
  maxWidth: '96vw',
});

export const Title = styled(ModalTitle)({
  marginBottom: '16px',
});

export const Form = styled(ModalForm)({});

export const FormControl = styled(MuiFormControl)({
  width: '100%',
});

export const Row = styled(ModalFormRow)({
  marginLeft: '-20px',
  marginRight: '-20px',
  marginBottom: '18px',

  '&:last-of-type': {
    marginBottom: '0',
  },
});

export const Col = styled(ModalFormCol)({
  width: '50%',
  flex: '0 0 auto',
  paddingLeft: '20px',
  paddingRight: '20px',
});

export const Actions = styled(ModalActions)({
  justifyContent: 'space-between',
  marginTop: '24px',
});
