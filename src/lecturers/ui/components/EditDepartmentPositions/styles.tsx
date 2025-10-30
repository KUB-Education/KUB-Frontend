import { styled } from '@mui/material';
import {
  DeleteButton,
  ModalActions,
  FormControl as CommonFormControl,
  DetailsButton,
  FormTextField,
} from '@/common/ui/components';

export const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '15px',
  borderRadius: '10px',
  border: '1px solid #79747E',
});

export const FormControl = styled(CommonFormControl)({
  width: '100%',
});

export const DepartmentList = styled('ul')();

export const DepartmentListItem = styled('li')({
  paddingBottom: '18px',
});

export const Department = styled('div')({
  display: 'flex',
  padding: '10px',
  borderRadius: '10px',
  border: '1px solid #79747E',
});

export const DepartmentName = styled(FormControl)({
  flexShrink: 0,
  marginRight: '8px',
  maxWidth: '200px',
});

export const DepartmentNameText = styled(FormTextField)({
  height: '100%',
});

export const DepartmentInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '10px',
  flexGrow: 1,
});

export const DepartmentInfoRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  columnGap: '8px',
});

const roleActionStyles = () => ({
  minWidth: '130px',
  height: '32px',
  fontWeight: 'normal',
  paddingTop: '3px',
  paddingBottom: '3px',
});

export const DepartmentDetailsControl = styled(DetailsButton)({
  ...roleActionStyles(),
});

export const DepartmentDeleteControl = styled(DeleteButton)({
  ...roleActionStyles(),
});

export const Actions = styled(ModalActions)({
  justifyContent: 'flex-end',
  marginTop: 'auto',
});
