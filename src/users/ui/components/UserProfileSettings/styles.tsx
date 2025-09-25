import {
  FormControl as MuiFormControl,
  InputLabel,
  styled,
  Button as MuiButton,
} from '@mui/material';
import RefreshIcon from '@/common/assets/icons/refresh.svg?react';
import {
  ModalTitle,
  ModalBody,
  ModalActions,
  ModalFormRow,
  ModalFormCol,
  FormTextField,
  CircularProgress,
} from '@/common/ui/components';

export const Root = styled(ModalBody)({
  maxWidth: '96vw',
  width: '1074px',
  minHeight: '400px',
  display: 'flex',
  flexDirection: 'column',
});

export const Content = styled('div')({
  flexGrow: 1,
  borderRadius: '10px',
  border: '1px solid #79747E',
  padding: '20px',
});

export const Loader = styled(CircularProgress)({
  color: '#3BB3FF',
  margin: 'auto',
});

export const Title = styled(ModalTitle)({
  marginBottom: '16px',
  color: '#001D36',
  fontWeight: 400,
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

export const FieldList = styled('ul')({
  marginBottom: '-18px',
});

export const FieldListItem = styled('li')({
  paddingBottom: '18px',
});

export const Field = styled(MuiFormControl)({
  width: '100%',
});

export const UserStatusField = styled(Field)({
  maxWidth: '240px',
});

export const FieldLabel = styled(InputLabel)({});

export const FieldText = styled(FormTextField)({});

export const Actions = styled(ModalActions)({
  justifyContent: 'space-between',
  marginTop: '20px',
});

export const ChangeButton = styled(MuiButton)({
  textTransform: 'none',
  borderRadius: '100px',
  background: '#3BB3FF',
  fontWeight: 500,
  height: '40px',
  color: '#FFF',
  paddingLeft: '24px',
  paddingRight: '24px',
});

export const ChangeButtonIcon = styled(RefreshIcon)({
  fill: '#FFF',
});
