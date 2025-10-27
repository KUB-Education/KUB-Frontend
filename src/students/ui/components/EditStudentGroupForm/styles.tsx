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

export const GroupList = styled('ul')({
  marginBottom: '-18px',
});

export const GroupListItem = styled('li')({
  paddingBottom: '18px',
});

export const GroupActions = styled(InputAdornment)({
  columnGap: '7px',
});

const groupActionStyles = () => ({
  height: '32px',
  fontWeight: 'normal',
  paddingTop: '3px',
  paddingBottom: '3px',
});

export const GroupInfo = styled(InfoButton)({
  ...groupActionStyles(),
});

export const GroupDelete = styled(DeleteButton)({
  ...groupActionStyles(),
});

export const Actions = styled(ModalActions)({
  justifyContent: 'flex-end',
  marginTop: '20px',
});
