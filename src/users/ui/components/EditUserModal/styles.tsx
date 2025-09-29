import { styled } from '@mui/material';
import {
  ModalTitle,
  ModalBody,
  ModalActions,
  ModalFormRow,
  ModalFormCol,
} from '@/common/ui/components';
import EditUserForm from '../EditUserForm';
import EditUserRolesForm from '../EditUserRolesForm';

export const Content = styled(ModalBody)({
  width: '1075px',
  maxWidth: '96vw',
});

export const Title = styled(ModalTitle)({
  marginBottom: '16px',
});

export const Row = styled(ModalFormRow)({
  marginLeft: '-10px',
  marginRight: '-10px',
});

export const Col = styled(ModalFormCol)({
  width: '50%',
  flex: '0 0 auto',
  paddingLeft: '10px',
  paddingRight: '10px',
  display: 'flex',
  flexDirection: 'column',
});

export const EditForm = styled(EditUserForm)({
  flexGrow: 1,
});

export const EditRolesForm = styled(EditUserRolesForm)({
  flexGrow: 1,
});

export const Actions = styled(ModalActions)({
  justifyContent: 'space-between',
  marginTop: '20px',
});
