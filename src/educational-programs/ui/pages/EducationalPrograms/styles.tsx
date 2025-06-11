import { styled } from '@mui/material';
import { ThreeTablesToolbar } from '@/common/ui/components';
import {
  EducationalProgram,
  Specialty,
  StudyField,
} from '@/educational-programs/entities';

export const Root = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
});

export const Toolbar = styled(
  ThreeTablesToolbar<StudyField, Specialty, EducationalProgram>,
)({
  marginBottom: '10px',
});
