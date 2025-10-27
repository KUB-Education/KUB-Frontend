import { styled } from '@mui/material';
import {
  ModalTitle,
  ModalBody,
  ModalActions,
  ModalFormRow,
  ModalFormCol,
} from '@/common/ui/components';
import EditLecturerForm from '../EditLecturerForm';
import EditLecturerAcademicTitle from '../EditLecturerAcademicTitle';
import EditLecturerDepartments from '../EditLecturerDepartments';

export const Content = styled(ModalBody)({
  width: '1440px',
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
  paddingLeft: '10px',
  paddingRight: '10px',
  display: 'flex',
  flexDirection: 'column',
});

export const EditForm = styled(EditLecturerForm)({
  flexGrow: 1,
});

export const EditAcademicTitle = styled(EditLecturerAcademicTitle)({
  flexGrow: 1,
});

export const EditDepartments = styled(EditLecturerDepartments)({
  flexGrow: 1,
});

export const EditFormCol = styled(Col)({
  flexGrow: 1,
  width: '28%',
  maxWidth: '405px',
});

export const EditDepartmentsCol = styled(Col)({
  flexGrow: 2,
});

export const EditAcademicTitleCol = styled(Col)({
  flexGrow: 1,
  width: '25%',
  maxWidth: '370px',
});

export const Actions = styled(ModalActions)({
  justifyContent: 'space-between',
  marginTop: '20px',
});
