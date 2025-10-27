import { InputAdornment, styled } from '@mui/material';
import {
  DeleteButton,
  ModalActions,
  ModalForm,
  FormControl as CommonFormControl,
} from '@/common/ui/components';

export const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  borderRadius: '10px',
  border: '1px solid #79747E',
});

export const Form = styled(ModalForm)({
  marginTop: 'auto',
});

export const FormControl = styled(CommonFormControl)({
  width: '100%',
});

export const TitleList = styled('ul')();

export const TitleListItem = styled('li')({
  paddingBottom: '18px',
});

export const TitleActions = styled(InputAdornment)({
  columnGap: '7px',
});

export const TitleDelete = styled(DeleteButton)({
  height: '32px',
  fontWeight: 'normal',
  paddingTop: '3px',
  paddingBottom: '3px',
});

export const Actions = styled(ModalActions)({
  justifyContent: 'flex-end',
  marginTop: '20px',
});
