import { styled } from '@mui/material';
import {
  AddButton as CommonAddButton,
  DeleteButton as CommonDeleteButton,
  EditButton as CommonEditButton,
  ResendButton as CommonResendButton,
} from '@/common/ui/components';

export const Root = styled('div')({
  minHeight: '34px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

export const ActionsList = styled('ul')({
  display: 'flex',
  alignItems: 'center',
  marginRight: '-10px',
});

export const ActionsListItem = styled('li')({
  paddingRight: '10px',
});

export const AddButton = styled(CommonAddButton)({
  height: '34px',
});

export const DeleteButton = styled(CommonDeleteButton)({
  height: '34px',
});

export const ResendButton = styled(CommonResendButton)({
  height: '34px',
});

export const EditButton = styled(CommonEditButton)({
  height: '34px',
});
