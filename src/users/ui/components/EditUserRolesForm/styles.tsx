import { InputAdornment, styled } from '@mui/material';
import {
  DeleteButton,
  InfoButton,
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
  marginTop: '20px',
});

export const FormControl = styled(CommonFormControl)({
  width: '100%',
});

export const RoleList = styled('ul')({
  marginBottom: '-18px',
});

export const RoleListItem = styled('li')({
  paddingBottom: '18px',
});

export const RoleActions = styled(InputAdornment)({
  columnGap: '7px',
});

const roleActionStyles = () => ({
  height: '32px',
  fontWeight: 'normal',
  paddingTop: '3px',
  paddingBottom: '3px',
});

export const RoleInfo = styled(InfoButton)({
  ...roleActionStyles(),
});

export const RoleDelete = styled(DeleteButton)({
  ...roleActionStyles(),
});

export const Actions = styled(ModalActions)({
  justifyContent: 'flex-end',
  marginTop: '20px',
});
